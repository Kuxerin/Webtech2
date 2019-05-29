let Shutter = require("./shutter");

function Window(width, height, shutter) {
    if(width === undefined || typeof width !== 'number' || width <= 0) {
        throw "Error! Width must be a defined positive number!";
    }
    if(height === undefined || typeof height !== 'number' || height <= 0) {
        throw "Error! Height must be a defined positive number!";
    }
    if(shutter === undefined) {
        throw "Error! Shutter must be defined!";
    }

    this.width =  width;
    this.height =  height;
    this.shutter = new Shutter.ShutterFromJson(shutter);
}

function WindowFromJson(window) {
    if(window === undefined) {
        throw "Error! Window cannot be undefined!";
    }

    return new Window(window.width, window.height, window.shutter);
}

module.exports = {
    Window: Window,
    WindowFromJson: WindowFromJson
};