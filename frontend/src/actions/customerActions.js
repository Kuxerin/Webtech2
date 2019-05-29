import CustomerConstants from '../constants/customerConstants'
import CustomerDispatcher from '../dispatchers/customerDispatcher'

class CustomerActions {

    setCustomer(customer) {
        CustomerDispatcher.handleViewAction({
            actionType : CustomerConstants.SET_CUSTOMER,
            payload : customer
        });
    }

    unsetCustomer() {
        CustomerDispatcher.handleViewAction({
            actionType : CustomerConstants.UNSET_CUSTOMER
        });
    }
}

export default new CustomerActions();
