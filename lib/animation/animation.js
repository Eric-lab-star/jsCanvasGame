"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _AnimationManager = _interopRequireDefault(require("../animationManager/AnimationManager.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * creates animation from sprite image
 * */
class Animation {
  constructor(image, spriteImage, stateInfo, imgWidth, imgHeight) {
    this.image = image;
    this.spriteImage = spriteImage;
    this.frames = new _AnimationManager.default(stateInfo).frames();
    this.imgHeight = imgHeight;
    this.imgWidth = imgWidth;
    this.opt = {
      resizeWidth: this.imgWidth * Animation.scale,
      resizeHeight: this.imgHeight * Animation.scale,
      resizeQuality: "pixelated"
    };
    this.image.src = this.spriteImage;
  }

  /**
   * loadAnimationStates is used to load group of multiple animations
   *
   */
  loadAnimationSets() {
    const animationSets = this.frames.map((x, y) => this.mapHandler(x, y));
    return animationSets;
  }
  mapHandler(x, y) {
    const animation = this.loadAnimation(x, y);
    return Promise.all(animation);
  }

  /**
   * loadAnimation function is used to load animation from sprite image
   * */
  loadAnimation(x, y) {
    const imgs = [];
    for (let i = 0; i < x; i++) {
      imgs.push(this.createImageBitmap(i, y));
    }
    return imgs;
  }

  /**
   * createImageBitmap function is a wrapper function of createImageBitmap webapi
   * */
  createImageBitmap(x, y) {
    return createImageBitmap(this.image, this.imgWidth * x, this.imgHeight * y, this.imgWidth, this.imgHeight, this.opt);
  }
}
exports.default = Animation;
_defineProperty(Animation, "scale", 2);