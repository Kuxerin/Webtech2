import { Dispatcher } from 'flux'
import axios from "axios/index";
import OrderConstants from '../constants/orderConstants'
import OrderStore from '../stores/orderStore'
import CustomerStore from '../stores/customerStore'

class OrderDispatcher extends Dispatcher {

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new OrderDispatcher();

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.CREATE_ORDER){
        return;
    }

    axios.post("/order/createOrder", {
        "order": data.action.payload
    })
        .then((response) => {

            let ID = response.data.orderID;
            axios.post("/order/readOrderForID", {
                "orderID": ID
            })
                .then((response) => {
                    CustomerStore._orders = [...CustomerStore._orders, response.data.order];
                    CustomerStore.emitOrdersChange();
                    OrderStore._allOrders = [...OrderStore._allOrders, response.data.order];
                    OrderStore.emitAllOrdersChange();
                })
        })

});

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.REFRESH_ORDERS){
        return;
    }

    axios.get("/order/readOrders")
        .then((response) => {
            OrderStore._allOrders = response.data.orders;
            OrderStore.emitAllOrdersChange();
        })
});

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.FINISH_SHUTTER){
        return;
    }

    axios.post("/order/finishShutter", {
        "orderID": data.action.payload.orderID,
        "shutterID": data.action.payload.shutterID
    })
        .then((response) => {
            let allOrders = [...OrderStore._allOrders];
            allOrders.forEach((order) => {
                if(order._id === data.action.payload.orderID) {
                    order.windows.forEach((window) => {
                        if(window.shutter.id === data.action.payload.shutterID) {
                            window.shutter.isFinished = true;
                        }
                    })
                }
            });

            OrderStore._allOrders = allOrders;
            OrderStore.emitAllOrdersChange();

            let orders = [...CustomerStore._orders];
            orders.forEach((order) => {
                if(order._id === data.action.payload.orderID) {
                    order.windows.forEach((window) => {
                        if(window.shutter.id === data.action.payload.shutterID) {
                            window.shutter.isFinished = true;
                        }
                    })
                }
            });

            CustomerStore._orders = orders;
            CustomerStore.emitOrdersChange();
        })
});

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.INSTALL_SHUTTER){
        return;
    }

    axios.post("/order/installShutter", {
        "orderID": data.action.payload
    })
        .then((response) => {
            let allOrders = [...OrderStore._allOrders];
            allOrders.forEach((order) => {
                if(order._id === data.action.payload) {
                    order.isInstalled = true;
                }
            });

            OrderStore._allOrders = allOrders;
            OrderStore.emitAllOrdersChange();

            let orders = [...CustomerStore._orders];
            orders.forEach((order) => {
                if(order._id === data.action.payload) {
                    order.isInstalled = true;
                }
            });

            CustomerStore._orders = orders;
            CustomerStore.emitOrdersChange();
        })
});

dispatcher.register((data) => {
    if(data.action.actionType !== OrderConstants.CREATE_INVOICE){
        return;
    }

    console.log(data)

    axios.post("/order/createInvoice", {
        "orderID": data.action.payload.orderID,
        "invoice": data.action.payload.invoice
    })
        .then((response) => {
            let allOrders = [...OrderStore._allOrders];
            allOrders.forEach((order) => {
                if(order._id === data.action.payload.orderID) {
                    order.invoice = data.action.payload.invoice;
                }
            });

            OrderStore._allOrders = allOrders;
            OrderStore.emitAllOrdersChange();

            let orders = [...CustomerStore._orders];
            orders.forEach((order) => {
                if(order._id === data.action.payload.orderID) {
                    order.invoice = data.action.payload.invoice;
                }
            });

            CustomerStore._orders = orders;
            CustomerStore.emitOrdersChange();
        })
});

export default dispatcher;
