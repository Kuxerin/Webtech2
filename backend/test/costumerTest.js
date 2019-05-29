const assert = require('assert');
const Customer = require('../src/models/customer');

describe('Customer tests', () => {
    it('test CustomerFromJson with undefined', () => {
        try {
            let testCustomer = new Customer.CustomerFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Customer must be defined!")
        }
    });

    it('test Customer with undefined name', () => {
        try {
            let name = undefined;
            let tel = "36201234567";
            let address = "3530 Miskolc";
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Name must be a defined string and not empty!")
        }
    });

    it('test Customer with undefined tel', () => {
        try {
            let name = "Tester Joe";
            let tel = undefined;
            let address = "3530 Miskolc";
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Tel must be a defined string and not empty!")
        }
    });

    it('test Customer with undefined address', () => {
        try {
            let name = "Tester Joe";
            let tel = "36201234567";
            let address = undefined;
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Address must be a defined string and not empty!")
        }
    });

    it('test Customer with non-string name', () => {
        try {
            let name = 1;
            let tel = "36201234567";
            let address = "3530 Miskolc";
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Name must be a defined string and not empty!")
        }
    });

    it('test Customer with non-string tel', () => {
        try {
            let name = "Tester Joe";
            let tel = 1;
            let address = "3530 Miskolc";
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Tel must be a defined string and not empty!")
        }
    });

    it('test Customer with non-string address', () => {
        try {
            let name = "Tester Joe";
            let tel = "36201234567";
            let address = 1;
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Address must be a defined string and not empty!")
        }
    });

    it('test Customer with empty name', () => {
        try {
            let name = "";
            let tel = "36201234567";
            let address = "3530 Miskolc";
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Name must be a defined string and not empty!")
        }
    });

    it('test Customer with empty tel', () => {
        try {
            let name = "Tester Joe";
            let tel = "";
            let address = "3530 Miskolc";
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Tel must be a defined string and not empty!")
        }
    });

    it('test Customer with empty address', () => {
        try {
            let name = "Tester Joe";
            let tel = "36201234567";
            let address = "";
            let testCustomer = new Customer.Customer(name, tel, address);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Address must be a defined string and not empty!")
        }
    });

    it('test Customer with appropriate testData', () => {
        try {
            let name = "Tester Joe";
            let tel = "36201234567";
            let address = "3530 Miskolc";
            let testCustomer = new Customer.Customer(name, tel, address);
        } catch (error) {
            assert.fail();
        }
    })
});
