const assert = require('assert');
const Invoice = require('../src/models/invoice');

describe('Invoice tests', () => {
    it('test invoice with undefined', () => {
        try {
            let testInvoice = new Invoice.InvoiceFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Invoice cannot be undefined!")
        }
    });

    it('test Invoice with undefined price', () => {
        try {
            let price = undefined;
            let isPaid = false;
            let testInvoice = new Invoice.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Price must be a defined positive number!")
        }
    });

    it('test Invoice with undefined isPaid', () => {
        try {
            let price = 200;
            let isPaid = undefined;
            let testInvoice = new Invoice.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! IsPaid must be a defined boolean!")
        }
    });

    it('test Invoice with non-integer price', () => {
        try {
            let price = "200";
            let isPaid = false;
            let testInvoice = new Invoice.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Price must be a defined positive number!")
        }
    });

    it('test Invoice with non-boolean isPaid', () => {
        try {
            let price = 200;
            let isPaid = "false";
            let testInvoice = new Invoice.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! IsPaid must be a defined boolean!")
        }
    });

    it('test Invoice with negative price', () => {
        try {
            let price = -200;
            let isPaid = false;
            let testInvoice = new Invoice.Invoice(price, isPaid);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Price must be a defined positive number!")
        }
    });

    it('test Invoice with price 0', () => {
        try {
            let price = 0;
            let isPaid = false;
            let testInvoice = new Invoice.Invoice(price, isPaid);
        } catch (error) {
            assert.fail();
        }
    });

    it('test Invoice with appropriate testData', () => {
        try {
            let price = 200;
            let isPaid = false;
            let testInvoice = new Invoice.Invoice(price, isPaid);
        } catch (error) {
            assert.fail();
        }
    })
});
