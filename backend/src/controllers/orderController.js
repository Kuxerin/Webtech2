const routes = require("express").Router();

const Invoice = require("../models/invoice");
const Order = require("../models/order");

const OrderService = require("../services/orderService");
const orderService = new OrderService();

const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

routes.get("/readOrders", (req, resp) => {
    orderService.readOrders((orders) => {
        resp.status(200).contentType("application/json").send({"orders": orders});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/readOrdersForTel", (req, resp) => {
    if(req.body["tel"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "tel must be defined"});
        return;
    }

    orderService.readOrdersForTel(req.body["tel"], (orders) => {
        resp.status(200).contentType("application/json").send({"orders": orders});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/readOrderForID", (req, resp) => {
    if(req.body["orderID"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "ID must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderID"])) {
        resp.status(400).contentType("application/json").send({"error": "orderID must be 24 hex string"});
        return;
    }

    orderService.readOrderForID(req.body["orderID"], (order) => {
        resp.status(200).contentType("application/json").send({"order": order});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/createOrder", (req, resp) => {
    let order;
    try {
        order = new Order.OrderFromJson(req.body["order"]);
    } catch (error) {
        resp.status(400).contentType("application/json").send({"error": error});
        return;
    }

    orderService.createOrder(order, (orderID) => {
        resp.status(200).contentType("application/json").send({"orderID": orderID});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});


routes.post("/installShutter", (req, resp) => {
    if(req.body["orderID"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "ID must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderID"])) {
        resp.status(400).contentType("application/json").send({"error": "orderID must be 24 hex string"});
        return;
    }

    orderService.installShutter(req.body["orderID"], () => {
        resp.status(200).contentType("application/json").send();
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/finishShutter", (req, resp) => {
    if(req.body["orderID"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "ID must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderID"])) {
        resp.status(400).contentType("application/json").send({"error": "orderID must be 24 hex string"});
        return;
    }

    if(req.body["shutterID"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "ID must be defined"});
        return;
    }

    orderService.finishShutter(req.body["orderID"], req.body["shutterID"], () => {
        resp.status(200).contentType("application/json").send();
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.post("/createInvoice", (req, resp) => {
    if(req.body["orderID"] === undefined) {
        resp.status(400).contentType("application/json").send({"error": "ID must be defined"});
        return;
    }

    if(!checkForHexRegExp.test(req.body["orderID"])) {
        resp.status(400).contentType("application/json").send({"error": "orderID must be 24 hex string"});
        return;
    }


    let invoice;
    try {
        invoice = new Invoice.InvoiceFromJson(req.body["invoice"]);
    } catch (error) {
        resp.status(400).contentType("application/json").send({"error": error});
        return;
    }

    orderService.createInvoice(req.body["orderID"], invoice, () => {
        resp.status(200).contentType("application/json").send();
    }, (error) => {
        resp.status(500).contentType("application/json").send({"error": error});
    });
});

module.exports = {
    routes: routes
};
