const assert = require('assert');
const Shutter = require('../src/models/shutter');

describe('Shutter tests', () => {
    it('test ShutterFromJson with undefined', () => {
        try {
            let testShutter = new Shutter.ShutterFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Shutter cannot be undefined!")
        }
    });

    it('test Shutter with undefined color', () => {
        try {
            let color = undefined;
            let material = "wooden";
            let isFinished = false;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Color must be a defined string and not empty!")
        }
    });

    it('test Shutter with undefined material', () => {
        try {
            let color = "white";
            let material = undefined;
            let isFinished = false;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Material must be a defined string and not empty!")
        }
    });

    it('test Shutter with undefined isFinished', () => {
        try {
            let color = "white";
            let material = "wooden";
            let isFinished = undefined;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! IsFinished must be a defined boolean and not empty!")
        }
    });

    it('test Shutter with number as color', () => {
        try {
            let color = 1;
            let material = "wooden";
            let isFinished = false;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Color must be a defined string and not empty!")
        }
    });

    it('test Shutter with number as material', () => {
        try {
            let color = "white";
            let material = 1;
            let isFinished = false;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Material must be a defined string and not empty!")
        }
    });

    it('test Shutter with number as isFinished', () => {
        try {
            let color = "white";
            let material = "wooden";
            let isFinished = 1;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! IsFinished must be a defined boolean and not empty!")
        }
    });

    it('test Shutter with empty color', () => {
        try {
            let color = "";
            let material = "wooden";
            let isFinished = false;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Color must be a defined string and not empty!")
        }
    });

    it('test Shutter with empty material', () => {
        try {
            let color = "white";
            let material = "";
            let isFinished = false;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Material must be a defined string and not empty!")
        }
    });

    it('test Shutter with appropriate testData', () => {
        try {
            let color = "white";
            let material = "wooden";
            let isFinished = false;
            let testShutter = new Shutter.Shutter(color, material, isFinished);
        } catch (error) {
            assert.fail();
        }
    })
});
