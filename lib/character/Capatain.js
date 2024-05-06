"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerStates = exports.default = void 0;
var _Character = _interopRequireDefault(require("./Character.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Captain extends _Character.default {
  constructor(ctx, position) {
    super(ctx, position, captainImgSize.width, captainImgSize.height, playerStates, captainImg);
  }
}
exports.default = Captain;
const captainImgSize = {
  width: 64,
  height: 40
};

/**
 *idle: 5,
 *run: 6,
 *jump: 3,
 *fall: 1,
 *hit1: 2,
 *hit2: 3,
 *attack1: 3,
 *attack2: 3,
 *attack3: 3,
 * */
const captainImg = "../../res/player_sprites.png";
const playerStates = exports.playerStates = {
  idle: 5,
  run: 6,
  jump: 3,
  fall: 1,
  hit1: 2,
  hit2: 3,
  attack1: 3,
  attack2: 3,
  attack3: 3
};