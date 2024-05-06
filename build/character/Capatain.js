"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerStates = void 0;
const Character_js_1 = __importDefault(require("./Character.js"));
class Captain extends Character_js_1.default {
    constructor(ctx, position) {
        super(ctx, position, captainImgSize.width, captainImgSize.height, exports.playerStates, captainImg);
    }
}
exports.default = Captain;
const captainImgSize = {
    width: 64,
    height: 40,
};
const captainImg = "../../res/player_sprites.png";
exports.playerStates = {
    idle: 5,
    run: 6,
    jump: 3,
    fall: 1,
    hit1: 2,
    hit2: 3,
    attack1: 3,
    attack2: 3,
    attack3: 3,
};
