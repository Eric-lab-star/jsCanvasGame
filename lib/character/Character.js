"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _animation = _interopRequireDefault(require("../animation/animation.js"));
var _Keyboard = _interopRequireDefault(require("../inputs/Keyboard.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Character {
  constructor(ctx, position, imgWidth, imgHeight, animationStates, imgsrc) {
    this.ctx = ctx;
    this.pos = position;
    this.speed = 5;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.animationStates = animationStates;
    this.spriteImage = imgsrc;
    new _Keyboard.default(this);
  }

  /** handleAnimation function either getSprite image
   *or drawAnimation. Received Parameters are passed to
   * drawAnimation function
   */
  handleAnimation(animationTick, animationState) {
    if (this.animation != undefined) {
      this.drawAnimation(animationTick, animationState);
    } else {
      this.setAnimation();
    }
  }

  //5 % 2 = 1
  //1 = 5 - 2*(5/2)
  /**
   *
   * */
  drawAnimation(animationTick, animation) {
    const intValue = Math.floor(animationTick / this.animation[animation].length);
    const modulo = animationTick - this.animation[animation].length * intValue; // 0 <= sprites[animation].length < i
    this.ctx.drawImage(this.animation[animation][modulo], this.pos.x, this.pos.y);
  }
  /**
   * create Character image and set animation
   * */
  setAnimation() {
    const img = new Image();
    const animation = new _animation.default(img, this.spriteImage, this.animationStates, this.imgWidth, this.imgHeight);
    img.addEventListener("load", async () => {
      const animationSets = animation.loadAnimationSets();
      this.animation = await Promise.all(animationSets);
    });
  }
  update(x, y) {
    this.pos.update(x, y);
  }
  setSpeed(s) {
    this.speed = s;
  }
}
exports.default = Character;