function OrderService(orderDAO) {
    this.winston = require('winston');
    this.logger = this.winston.createLogger({
        level: 'info',
        format: this.winston.format.json(),
        transports: [
            new this.winston.transports.File({filename: 'logs/error.log', level: 'error'}),
            new this.winston.transports.File({filename: 'logs/combined.log'})
        ]
    });

    if(orderDAO !== undefined || orderDAO === null) {
        this.orderDAO = orderDAO;
    } else {
        this.orderDAO = require('../DAOs/orderDAO');
    }
}

OrderService.prototype.readOrders = function(successCallback, errorCallback){
    this.orderDAO.readOrders((orders) => {
        this.logger.info(`readOrders: ${orders.length} orders were found!`);
        successCallback(orders);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

OrderService.prototype.readOrdersForTel = function(tel, successCallback, errorCallback){
    this.orderDAO.readOrdersForTel(tel, (orders) => {
        this.logger.info(`readOrdersForTel: ${orders.length} orders were found!`);
        successCallback(orders);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

OrderService.prototype.readOrderForID = function(orderID, successCallback, errorCallback){
    this.orderDAO.readOrderForID(orderID, (order) => {
        this.logger.info("readOrderForID: order was found!");
        successCallback(order);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

OrderService.prototype.createOrder = function(order, successCallback, errorCallback){
    for (let i = 0; i < order.windows.length; i++) {
        order.windows[i].shutter.parts = [
            {
                count: Math.ceil(order.windows[i].height / 20),
                description: `${order.windows[i].width}mm wide, ${order.windows[i].shutter.color} ${order.windows[i].shutter.material}`
            },
            {
                count: 2,
                description: "Ropes"
            }
        ];
    }

    this.orderDAO.createOrder(order, (orderID) => {
        this.logger.info("createOrder: Order created");
        successCallback(orderID);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

OrderService.prototype.finishShutter = function(orderID, shutterID, successCallback, errorCallback){
    this.orderDAO.finishShutter(orderID, shutterID, () => {
        this.logger.info("finishShutter: Shutter finished");
        successCallback();
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

OrderService.prototype.installShutter = function(orderID, successCallback, errorCallback){
    this.orderDAO.installShutter(orderID, () => {
        this.logger.info("installShutter: Shutter installed");
        successCallback();
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

OrderService.prototype.createInvoice = function(orderID, invoice, successCallback, errorCallback){
    this.orderDAO.createInvoice(orderID, invoice, () => {
        this.logger.info("createInvoice: invoice created");
        successCallback();
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

module.exports = OrderService;