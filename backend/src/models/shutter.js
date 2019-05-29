let counter = (function(){
    let cnt = 0;
    return function(){
        cnt++;
        return cnt;
    }
})();

function Shutter(color, material, isFinished) {
    if(color === undefined || typeof color !== 'string' || color.trim() === "") {
        throw "Error! Color must be a defined string and not empty!";
    }
    if(material === undefined || typeof material !== 'string' || material.trim() === "") {
        throw "Error! Material must be a defined string and not empty!";
    }
    if(isFinished === undefined || typeof isFinished !== 'boolean') {
        throw "Error! IsFinished must be a defined boolean and not empty!";
    }

    this.id = counter();
    this.color =  color;
    this.material = material;
    this.isFinished = isFinished
}

function ShutterFromJson(shutter) {
    if(shutter === undefined) {
        throw "Error! Shutter cannot be undefined!";
    }

    return new Shutter(shutter.color, shutter.material, shutter.isFinished);
}

module.exports = {
    Shutter: Shutter,
    ShutterFromJson: ShutterFromJson
};
