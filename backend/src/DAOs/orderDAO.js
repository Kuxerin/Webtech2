const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const dbConnect = require('../db/dbConnect').dbConnect;

async function readOrders(successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('orders');

    collection.find().toArray((error, orders) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(orders);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function readOrdersForTel(tel, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('orders');

    collection.find({"customer.tel": tel}).toArray((error, orders) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(orders);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function readOrderForID(orderID, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('orders');

    collection.findOne({"_id": ObjectID(orderID)}, (error, order) => {
            try {
                assert.strictEqual(null, error, error);

                successCallback(order);
            } catch (error) {
                errorCallback("" + error);
            }
        }
    );
}

async function createOrder(order, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('orders');

    collection.insertOne(order, (error,response) => {
        try {
            assert.strictEqual(null, error, error);
            assert.strictEqual(1, response.insertedCount, "Failed to insert order");

            successCallback(response.insertedId);
        } catch (error) {
            errorCallback("" + error);
        }
    })
}

async function finishShutter(orderID, shutterID, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('orders');

    collection.updateOne({  "_id": ObjectID(orderID),
                            "windows.shutter.id": shutterID},
                            {$set: {"windows.$.shutter.isFinished": true}}, (error, response) => {
            try {
                assert.strictEqual(null, error, error);
                assert.strictEqual(1, response.matchedCount, "Failed to find order");
                assert.strictEqual(1, response.modifiedCount, "Failed to update order");

                successCallback();
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

async function installShutter(orderID, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('orders');

    collection.updateOne({  "_id": ObjectID(orderID)},
                            {$set: {"isInstalled": true}}, (error, response) => {
            try {
                assert.strictEqual(null, error, error);
                assert.strictEqual(1, response.matchedCount, "Failed to find order");
                assert.strictEqual(1, response.modifiedCount, "Failed to update order");

                successCallback();
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

async function createInvoice(orderID, invoice, successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection('orders');

    collection.updateOne({  "_id": ObjectID(orderID)},
                            {$set: {"invoice": invoice}}, (error, response) => {
            try {
                assert.strictEqual(null, error, error);
                assert.strictEqual(1, response.matchedCount, "Failed to find order");
                assert.strictEqual(1, response.modifiedCount, "Failed to update order");

                successCallback();
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

module.exports = {
    "readOrders" : readOrders,
    "readOrdersForTel" : readOrdersForTel,
    "readOrderForID": readOrderForID,
    "createOrder" : createOrder,
    "finishShutter": finishShutter,
    "installShutter": installShutter,
    "createInvoice": createInvoice
};