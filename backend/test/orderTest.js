const assert = require('assert');
const Order = require('../src/models/order');
const Customer = require('../src/models/customer');
const Invoice = require('../src/models/invoice');
const Window = require('../src/models/window');

describe('Order tests', () => {
    it('test OrderFromJson with undefined', () => {
        try {
            let testOrder = new Order.OrderFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Order cannot be undefined!")
        }
    });

    it('test Order with undefined notes', () => {
        try {
            let notes = undefined;
            let customer = new Customer.Customer("Tester Joe", "36201234567", "3530 Miskolc");
            let invoice = new Invoice.Invoice(100, false);
            let windows = [];
            windows.push(new Window.WindowFromJson({
                width: 220,
                height: 280,
                shutter:  {
                    color: "white",
                    material: "wooden",
                    isFinished: false
                }
            }));
            windows.push(new Window.WindowFromJson({
                width: 210,
                height: 320,
                shutter:  {
                    color: "black",
                    material: "metal",
                    isFinished: true
                }
            }));

            let testOrder = new Order.Order(notes, false, customer, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Notes must be a defined string!")
        }
    });

    it('test Order with undefined customer', () => {
        try {
            let notes = "test note";
            let customer = undefined;
            let invoice = new Invoice.Invoice(100, false);
            let windows = [];
            windows.push(new Window.WindowFromJson({
                width: 220,
                height: 280,
                shutter:  {
                    color: "white",
                    material: "wooden",
                    isFinished: false
                }
            }));
            windows.push(new Window.WindowFromJson({
                width: 210,
                height: 320,
                shutter:  {
                    color: "black",
                    material: "metal",
                    isFinished: true
                }
            }));

            let testOrder = new Order.Order(notes, false, customer, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Customer cannot be undefined!")
        }
    });

    it('test Order with undefined windows', () => {
        try {
            let notes = "test note";
            let customer = new Customer.Customer("Tester Joe", "36201234567", "3530 Miskolc");
            let invoice = new Invoice.Invoice(100, false);
            let windows = undefined;

            let testOrder = new Order.Order(notes, false, customer, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Windows must be a defined array with a positive length!")
        }
    });

    it('test Order with number as notes', () => {
        try {
            let notes = 1;
            let customer = new Customer.Customer("Tester Joe", "36201234567", "3530 Miskolc");
            let invoice = new Invoice.Invoice(100, false);
            let windows = [];
            windows.push(new Window.WindowFromJson({
                width: 220,
                height: 280,
                shutter:  {
                    color: "white",
                    material: "wooden",
                    isFinished: false
                }
            }));
            windows.push(new Window.WindowFromJson({
                width: 210,
                height: 320,
                shutter:  {
                    color: "black",
                    material: "metal",
                    isFinished: true
                }
            }));

            let testOrder = new Order.Order(notes, false, customer, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Notes must be a defined string!")
        }
    });

    it('test Order with window as an object', () => {
        try {
            let notes = "test note";
            let customer = new Customer.Customer("Tester Joe", "36201234567", "3530 Miskolc");
            let invoice = new Invoice.Invoice(100, false);
            let windows = new Window.WindowFromJson({
                width: 220,
                height: 280,
                shutter:  {
                    color: "white",
                    material: "wooden",
                    isFinished: false
                }
            });

            let testOrder = new Order.Order(notes, false, customer, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Windows must be a defined array with a positive length!")
        }
    });

    it('test Order with empty array', () => {
        try {
            let notes = "test note";
            let customer = new Customer.Customer("Tester Joe", "36201234567", "3530 Miskolc");
            let invoice = new Invoice.Invoice(100, false);
            let windows = [];

            let testOrder = new Order.Order(notes, false, customer, invoice, windows);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Windows must be a defined array with a positive length!")
        }
    });

    it('test Order with appropriate testData', () => {
        try {
            let notes = "test note";
            let customer = new Customer.Customer("Tester Joe", "36201234567", "3530 Miskolc");
            let invoice = new Invoice.Invoice(100, false);
            let windows = [];
            windows.push(new Window.WindowFromJson({
                width: 220,
                height: 280,
                shutter:  {
                    color: "white",
                    material: "wooden",
                    isFinished: false
                }
            }));
            windows.push(new Window.WindowFromJson({
                width: 210,
                height: 320,
                shutter:  {
                    color: "black",
                    material: "metal",
                    isFinished: true
                }
            }));

            let testOrder = new Order.Order(notes, false, customer, invoice, windows);
        } catch (error) {
            assert.fail();
        }
    });
});
