import EventEmitter from 'events'

class CustomerStore extends EventEmitter{
    _customer = undefined;
    _orders = [];

    emitCustomerChange(){
        this.emit('customer-change');
    }

    addCustomerChangeListener(callback) {
        this.addListener('customer-change', callback);
    }

    removeCustomerChangeListener(callback) {
        this.removeListener('customer-change', callback);
    }

    emitOrdersChange(){
        this.emit('orders-change');
    }

    addOrdersChangeListener(callback) {
        this.addListener('orders-change', callback);
    }

    removeOrdersChangeListener(callback) {
        this.removeListener('orders-change', callback);
    }
}

export default new CustomerStore();
