const assert = require('assert');
const OrderService = require('../src/services/orderService');

describe('OrderService tests', () => {
    it('test can OrderService be constructed', () => {
        const orderService = new OrderService();

        if(orderService !== undefined && orderService !== null) {
            assert.ok(true);
        } else{
            assert.ok(false);
        }
    });

    it('test OrderService.readOrders (success)', () => {
        const DAO = {
            readOrders : function(success, error){
                success(["1","2"]);
            }
        };
        const orderService = new OrderService(DAO);

        orderService.readOrders(
            (resp) => {
                assert.deepStrictEqual(resp, ["1","2"]);
            },
            (error) => {
                assert.fail(error);
            }
        );
    });

    it('test OrderService.readOrders (error)', () => {
        const DAO = {
            readOrders : function(success, error){
                error("error");
            }
        };
        const orderService = new OrderService(DAO);

        orderService.readOrders(
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.ok(true);
            }
        );
    });

    it('test OrderService.readOrderForID (success)', () => {
        const DAO = {
            readOrderForID : function(orderID, success, error){
                success(orderID);
            }
        };
        const orderService = new OrderService(DAO);

        orderService.readOrderForID(
            1,
            (resp) => {
                assert.deepStrictEqual(resp, 1);
            },
            (error) => {
                assert.fail(error);
            }
        );
    });

    it('test OrderService.readOrderForID (error)', () => {
        const DAO = {
            readOrderForID : function(orderID, success, error){
                error(orderID);
            }
        };
        const orderService = new OrderService(DAO);

        orderService.readOrderForID(
            1,
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepStrictEqual(error, 1);
            }
        );
    });

    it('test OrderService.readOrdersForTel (success)', () => {
        const DAO = {
            readOrdersForTel : function(tel, success, error){
                success(tel);
            }
        };
        const orderService = new OrderService(DAO);

        orderService.readOrdersForTel(
            "36201234567",
            (resp) => {
                assert.deepStrictEqual(resp, "36201234567");
            },
            (error) => {
                assert.fail(error);
            }
        );
    });

    it('test OrderService.readOrdersForTel (error)', () => {
        const DAO = {
            readOrdersForTel : function(tel, success, error){
                error(tel);
            }
        };
        const orderService = new OrderService(DAO);

        orderService.readOrdersForTel(
            "36201234567",
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepStrictEqual(error, "36201234567");
            }
        );
    });

    it('test OrderService.finishShutter (success))', () => {
        const DAO = {
            finishShutter : function(orderID, shutterID, success, error){
                success();
            }
        };
        const orderService = new OrderService(DAO);

        orderService.finishShutter(
            1,
            2,
            (resp) => {
                assert.ok(true);
            },
            (error) => {
                assert.fail(error);
            }
        );
    });

    it('test OrderService.finishShutter (error)', () => {
        const DAO = {
            finishShutter : function(orderID, shutterID, success, error){
                error("" + orderID + " " + shutterID);
            }
        };
        const orderService = new OrderService(DAO);

        orderService.finishShutter(
            1,
            2,
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepStrictEqual(error, "1 2");
            }
        );
    });

    it('test OrderService.createInvoice (success)', () => {
        const DAO = {
            createInvoice : function(orderID, invoice, success, error){
                success();
            }
        };
        const orderService = new OrderService(DAO);

        orderService.createInvoice(
            1,
            "invoice",
            (resp) => {
                assert.ok(true);
            },
            (error) => {
                assert.fail(error);
            }
        );
    });

    it('test OrderService.createInvoice (error)', () => {
        const DAO = {
            createInvoice : function(orderID, invoice, success, error){
                error( "" + orderID + " " + invoice );
            }
        };
        const orderService = new OrderService(DAO);

        orderService.createInvoice(
            1,
            "invoice",
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepStrictEqual(error, "1 invoice");
            }
        );
    });

    it('test OrderService.createOrder (success)', () => {
        const testOrder = {
            customer: {
                name: "Tester Joe",
                tel: "36201234567",
                address: "3530 Miskolc"
            },
            notes: "No annotation.",
            windows: [
                {
                    width: "220",
                    height: "280",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        isFinished: false
                    }
                }
            ]
        };
        const DAO = {
            createOrder : function(order, success, error){
                success("testid-01");
            }
        };
        const orderService = new OrderService(DAO);

        orderService.createOrder(
            testOrder,
            (resp) => {
                assert.deepStrictEqual(resp, "testid-01");
            },
            (error) => {
                assert.fail(error);
            }
        );
    });

    it('test OrderService.createOrder (error)', () => {
        const testOrder = {
            customer: {
                name: "Tester Joe",
                tel: "36201234567",
                address: "3530 Miskolc"
            },
            notes: "No annotation.",
            windows: [
                {
                    width: "220",
                    height: "380",
                    shutter: {
                        id: 1,
                        color: "white",
                        material: "plastic",
                        isFinished: true
                    }
                }
            ]
        };
        const DAO = {
            createOrder : function(order, success, error){
                error( "error" );
            }
        };
        const orderService = new OrderService(DAO);

        orderService.createOrder(
            testOrder,
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.deepStrictEqual(error, "error");
            }
        );
    })
});