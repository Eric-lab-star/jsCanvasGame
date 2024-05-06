"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fierceToothStates = exports.fierceToothImg = exports.default = void 0;
var _Character = _interopRequireDefault(require("./Character.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FierceTooth extends _Character.default {
  constructor(ctx, position) {
    super(ctx, position, fierceToothImgSize.width, fierceToothImgSize.height, fierceToothStates, fierceToothImg);
  }
}
exports.default = FierceTooth;
const fierceToothImgSize = {
  width: 68,
  height: 34
};
const fierceToothImg = exports.fierceToothImg = "../../res/fierce_tooth.png";

/**
 *idle: 7,
 *run: 6,
 *jump: 3,
 *fall: 1,
 *ground: 2,
 *anticipation: 3,
 *attack1: 3,
 *hit: 4,
 *deatHit: 4,
 *deadGround: 4,
 *
 * */
const fierceToothStates = exports.fierceToothStates = {
  idle: 7,
  run: 6,
  jump: 3,
  fall: 1,
  ground: 2,
  anticipation: 3,
  attack1: 3,
  hit: 4,
  deatHit: 4,
  deadGround: 4
};