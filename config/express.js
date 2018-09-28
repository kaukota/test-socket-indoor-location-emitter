'use strict';

var bodyParser = require('body-parser');

var routes = require('../routes');
var socket = require('../routes/socket');
var utils = require('../utils');

module.exports = function () {

    var app = require('express')();

    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    // Express configuration
    app.use(bodyParser.json());
    app.options('*', function(req, res) {
        var origin = req.get('origin');
        if (origin) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', true);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
        res.status(200).send();
    });
    app.use(function(req, res, next) {
        var origin = req.get('origin');
        if (origin) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', true);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
        return next();
    });

    // Initialize utils before all
    utils.init(io);

    // redirect all others to the index (HTML5 history)
    app.all('*', routes.default);

    // Socket.io Communication
    io.on('connection', socket);

    // Start server
    var port = process.env.PORT || 3003;
    server.listen(port, function () {
        console.log("Server listening on port %d in %s mode", port, app.settings.env);
    });

};