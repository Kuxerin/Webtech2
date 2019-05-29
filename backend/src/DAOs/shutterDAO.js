const assert = require('assert');

const dbConnect = require('../db/dbConnect').dbConnect;

async function readShutterColors(successCallback, errorCallback) {
    const db = await dbConnect();
    const collection = db.collection("shutter_colors");

    collection.find().toArray((error, colors) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(colors);
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function readShutterMats(successCallback, errorCallback) {
    const db = await dbConnect();
    const collection= db.collection("shutter_mats");

    collection.find().toArray((error, mats) => {
        try {
            assert.strictEqual(null, error, error);

            successCallback(mats)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

module.exports = {
    "readShutterColors" : readShutterColors,
    "readShutterMats" : readShutterMats
};
