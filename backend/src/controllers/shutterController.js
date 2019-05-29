const routes = require("express").Router();

const ShutterService = require("../services/shutterService");
const shutterService = new ShutterService();

routes.get("/readShutterMats", (req, resp) => {
    shutterService.readShutterMats((mats) => {
        resp.status(200).contentType("application/json").send({"mats": mats});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

routes.get("/readShutterColors", (req, resp) => {
    shutterService.readShutterColors((colors) => {
        resp.status(200).contentType("application/json").send({"colors": colors});
    }, (error) => {
        resp.status(400).contentType("application/json").send({"error": error});
    });
});

module.exports = {
    routes: routes
};
