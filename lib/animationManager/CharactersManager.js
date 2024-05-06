"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerAnimationManager = exports.fierceToothAnimationManager = void 0;
var _Capatain = require("../character/Capatain.js");
var _FierceTooth = require("../character/FierceTooth.js");
var _AnimationManager = _interopRequireDefault(require("./AnimationManager.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const playerAnimationManager = exports.playerAnimationManager = new _AnimationManager.default(_Capatain.playerStates);
const fierceToothAnimationManager = exports.fierceToothAnimationManager = new _AnimationManager.default(_FierceTooth.fierceToothStates);