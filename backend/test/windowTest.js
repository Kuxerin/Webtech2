const assert = require('assert');
const Window = require('../src/models/window');
const Shutter = require('../src/models/shutter');

describe('Window tests', () => {
    it('test WindowFromJson with undefined', () => {
        try {
            let testWindow = new Window.WindowFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Window cannot be undefined!")
        }
    });

    it('test Window with undefined width', () => {
        try {
            let width = undefined;
            let height = 300;
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Width must be a defined positive number!")
        }
    });

    it('test Window with undefined height', () => {
        try {
            let width = 100;
            let height = undefined;
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Height must be a defined positive number!")
        }
    });

    it('test Window with undefined shutter', () => {
        try {
            let width = 100;
            let height = 300;
            let shutter = undefined;
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Shutter must be defined!")
        }
    });

    it('test Window with string as width', () => {
        try {
            let width = "100";
            let height = 300;
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Width must be a defined positive number!")
        }
    });

    it('test Window with string as height', () => {
        try {
            let width = 100;
            let height = "300";
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Height must be a defined positive number!")
        }
    });

    it('test Window with string as shutter', () => {
        try {
            let width = 100;
            let height = 300;
            let shutter = "shutter";
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.ok(true);
        }
    });

    it('test Window with negative width', () => {
        try {
            let width = -100;
            let height = 300;
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Width must be a defined positive number!")
        }
    });

    it('test Window with negative height', () => {
        try {
            let width = 100;
            let height = -300;
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Height must be a defined positive number!")
        }
    });

    it('test Window with zero width', () => {
        try {
            let width = 0;
            let height = 300;
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Width must be a defined positive number!")
        }
    });

    it('test Window with zero height', () => {
        try {
            let width = 100;
            let height = 0;
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error, "Error! Height must be a defined positive number!")
        }
    });

    it('test Window with appropriate testData', () => {
        try {
            let width = 100;
            let height = 300;
            let shutter = new Shutter.Shutter("white", "wood", false);
            let testWindow = new Window.Window(width, height, shutter);
        } catch (error) {
            assert.fail();
        }
    })
});