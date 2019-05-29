import { Dispatcher } from 'flux'
import axios from "axios/index";
import CustomerConstants from '../constants/customerConstants'
import CustomerStore from '../stores/customerStore'

class CustomerDispatcher extends Dispatcher {

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new CustomerDispatcher();

dispatcher.register((data) => {
    if(data.action.actionType !== CustomerConstants.SET_CUSTOMER){
        return;
    }

    axios.post("/order/readOrdersForTel", {
        "tel": data.action.payload.tel
    })
        .then((response) => {
            CustomerStore._customer = data.action.payload;
            CustomerStore._orders = response.data.orders;
            CustomerStore.emitCustomerChange();
            CustomerStore.emitOrdersChange();
        })
});

dispatcher.register((data) => {
    if(data.action.actionType !== CustomerConstants.UNSET_CUSTOMER){
        return;
    }

    CustomerStore._customer = undefined;
    CustomerStore._orders = [];
    CustomerStore.emitCustomerChange();
    CustomerStore.emitOrdersChange();
});

dispatcher.register((data) => {
    if(data.action.actionType !== CustomerConstants.REFRESH_CUSTOMER_ORDERS){
        return;
    }

    axios.post("/order/readOrdersForTel", {
        "tel": CustomerStore._customer.tel
    })
        .then((response) => {
            CustomerStore._orders = response.data.orders;
            CustomerStore.emitOrdersChange();
        })
});

export default dispatcher;
