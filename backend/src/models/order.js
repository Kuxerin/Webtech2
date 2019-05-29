let Invoice = require("./invoice");
let Customer = require("./customer");
let Window = require("./window");

function Order(notes, isInstalled, customer, invoice, windows) {
    if(notes === undefined || typeof notes !== 'string') {
        throw "Error! Notes must be a defined string!";
    }
    if(customer === undefined) {
        throw "Error! Customer cannot be undefined!";
    }
    if(windows === undefined || !Array.isArray(windows) || windows.length <= 0) {
        throw "Error! Windows must be a defined array with a positive length!";
    }
    if(isInstalled === undefined || typeof isInstalled !== 'boolean') {
        throw "Error! IsInstalled must be a defined boolean!";
    }

    for (let i = 0; i < windows.length; i++) {
        windows[i] = new Window.WindowFromJson(windows[i]);
    }

    this.notes = notes;
    this.customer = new Customer.CustomerFromJson(customer);
    if(invoice !== undefined) {
        this.invoice = new Invoice.InvoiceFromJson(invoice);
    }
    this.isInstalled = isInstalled;
    this.windows = windows;
}

function OrderFromJson(order) {
    if(order === undefined) {
        throw "Error! Order cannot be undefined!";
    }

    return new Order(order.notes, order.isInstalled, order.customer, order.invoice, order.windows);
}

module.exports = {
    Order: Order,
    OrderFromJson: OrderFromJson
};
