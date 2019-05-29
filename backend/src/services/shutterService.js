function ShutterService(shutterDAO) {
    this.winston = require('winston');
    this.logger = this.winston.createLogger({
        level: 'info',
        format: this.winston.format.json(),
        transports: [
            new this.winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new this.winston.transports.File({ filename: 'logs/combined.log' })
        ]
    });

    if(shutterDAO !== undefined) {
        this.shutterDAO = shutterDAO;
    } else {
        this.shutterDAO = require('../DAOs/shutterDAO');
    }
}

ShutterService.prototype.readShutterColors = function(successCallback, errorCallback){
    this.shutterDAO.readShutterColors((colors) => {
        this.logger.info(`readShutterColors: ${colors.length} colors were found!`);
        successCallback(colors);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

ShutterService.prototype.readShutterMats = function(successCallback, errorCallback){
    this.shutterDAO.readShutterMats((mats) => {
        this.logger.info(`readShutterMats: ${mats.length} materials were found!`);
        successCallback(mats);
    }, (error) => {
        this.logger.error("Error! " + error);
        errorCallback(error);
    })
};

module.exports = ShutterService;
