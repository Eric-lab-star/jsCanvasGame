"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fierceToothStates = exports.fierceToothImg = void 0;
const Character_js_1 = __importDefault(require("./Character.js"));
class FierceTooth extends Character_js_1.default {
    constructor(ctx, position) {
        super(ctx, position, fierceToothImgSize.width, fierceToothImgSize.height, exports.fierceToothStates, exports.fierceToothImg);
    }
}
exports.default = FierceTooth;
const fierceToothImgSize = {
    width: 68,
    height: 34,
};
exports.fierceToothImg = "../../res/fierce_tooth.png";
exports.fierceToothStates = {
    idle: 7,
    run: 6,
    jump: 3,
    fall: 1,
    ground: 2,
    anticipation: 3,
    attack1: 3,
    hit: 4,
    deatHit: 4,
    deadGround: 4,
};
