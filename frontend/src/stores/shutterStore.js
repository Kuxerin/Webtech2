import EventEmitter from 'events'

class ShutterStore extends EventEmitter {
    _shutterColors = [];
    _shutterMats = [];

    emitShutterColorsChange() {
        this.emit('shutter-colors-change');
    }

    addShutterColorsChangeListener(callback) {
        this.addListener('shutter-colors-change', callback);
    }

    removeShutterColorsChangeListener(callback) {
        this.removeListener('shutter-colors-change', callback);
    }

    emitShutterMatsChange() {
        this.emit('shutter-mats-change');
    }

    addShutterMatsChangeListener(callback) {
        this.addListener('shutter-mats-change', callback);
    }

    removeShutterMatsChangeListener(callback) {
        this.removeListener('shutter-mats-change', callback);
    }
}

export default new ShutterStore();
