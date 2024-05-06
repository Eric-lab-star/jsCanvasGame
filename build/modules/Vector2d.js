"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Vector2d;
