const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const logger = require('morgan');

const indexRoutes = require("./controllers/mainController").routes;
const orderRoutes = require("./controllers/orderController").routes;
const shutterRoutes = require("./controllers/shutterController").routes;

const dbConnect = require('./db/dbConnect').dbConnect;

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..', '..', 'frontend', 'build')));

app.use('/', indexRoutes);
app.use('/order/', orderRoutes);
app.use('/shutter/', shutterRoutes);

dbConnect();
module.exports = app;
