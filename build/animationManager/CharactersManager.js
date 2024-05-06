"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fierceToothAnimationManager = exports.playerAnimationManager = void 0;
const Capatain_js_1 = require("../character/Capatain.js");
const FierceTooth_js_1 = require("../character/FierceTooth.js");
const AnimationManager_js_1 = __importDefault(require("./AnimationManager.js"));
exports.playerAnimationManager = new AnimationManager_js_1.default(Capatain_js_1.playerStates);
exports.fierceToothAnimationManager = new AnimationManager_js_1.default(FierceTooth_js_1.fierceToothStates);
