import OrderConstants from '../constants/orderConstants'
import OrderDispatcher from '../dispatchers/orderDispatcher'

class OrderActions {

    createOrder(order) {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.CREATE_ORDER,
            payload : order
        })
    }

    refreshOrders() {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.REFRESH_ORDERS
        })
    }

    finishShutter(orderID, shutterID) {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.FINISH_SHUTTER,
            payload : {
                orderID : orderID,
                shutterID: shutterID
            }
        })
    }

    installShutter(orderID) {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.INSTALL_SHUTTER,
            payload : orderID
        })
    }

    createInvoice(orderID, invoice) {
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.CREATE_INVOICE,
            payload : {
                orderID: orderID,
                invoice: invoice
            }
        })
    }
}

export default new OrderActions();