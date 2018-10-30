"use strict";

module.exports = {
  port: process.env.PORT || 3003,
  bbox: process.env.bbox ? JSON.parse(process.env.bbox) : [3.01924, 50.632392, 3.021464, 50.633634],
  floorbox: process.env.floorbox ? JSON.parse(process.env.floorbox) : [0, 3]
};
