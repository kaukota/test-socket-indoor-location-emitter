'use strict';

var _ = require('lodash');

var utils = require('../utils');
var config = require('../config/config');

function sendFakePositionTo(userId, bbox, floorbox) {
    utils.sendIndoorLocationTo({
        latitude: _.random(bbox[1], bbox[3], true),
        longitude: _.random(bbox[0], bbox[2], true),
        floor: _.random(floorbox[0], floorbox[1]),
        timestamp: Date.now(),
        accuracy: 1
    }, userId);
}

module.exports = function (socket) {
    utils.log(1, 'socket on "connection"', {
        id: socket.id
    });

    socket.userId = _.get(socket, 'handshake.query.userId', null);
    // bbox as min lgn, min lat, max lng, max lat. Default is in Euratechnologies
    socket.bbox = _.get(socket, 'handshake.query.bbox', config.bbox);
    // floorbox as min floor, max floor
    socket.floorbox = _.get(socket, 'handshake.query.floorbox', config.floorbox);

    if (!socket.userId || socket.userId === 'unknown') {
        // Cannot use 'error' event https://stackoverflow.com/questions/33872052/how-to-emit-error-to-be-possible-catch-it-on-error-handler-on-client-side
        socket.emit('socket error', new Error('Unknown userId'));
        socket.disconnect(true);
    }
    else {
        socket.fakeIndoorLocationInterval = setInterval(function () {
            sendFakePositionTo(socket.userId, socket.bbox, socket.floorbox);
        }, 5000);
        sendFakePositionTo(socket.userId, socket.bbox, socket.floorbox);
    }

    socket.on('disconnect', function () {
        utils.log(1, 'socket on "disconnect"', {
            id: socket.id
        });

        clearInterval(socket.fakeIndoorLocationInterval);
    });
};