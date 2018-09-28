'use strict';

var _ = require('lodash');

var io = null;

exports.init = function (ioRoom) {
    io = ioRoom;
};

var broadcast = function (event, data) {
    io.emit(event, data);
};
exports.broadcast = broadcast;

var log = function () {
    console.log(arguments);
};
exports.log = log;

exports.sendIndoorLocationTo = function (indoorLocation, userId) {
    var clients = _.filter(_.get(io, 'sockets.connected'), {userId: userId});

    if (!_.isEmpty(clients)) {
        log(0, 'sendIndoorLocationTo', {
            userId: userId,
            indoorLocation: indoorLocation
        });

        _.forEach(clients, function (client) {
            client.emit('indoorLocationChange', {
                userId: userId,
                indoorLocation: indoorLocation
            });
        });
    }
};
