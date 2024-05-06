"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Vector2d holds position on canvas
 * */
class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}
var _default = exports.default = Vector2d;