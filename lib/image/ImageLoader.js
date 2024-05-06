"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _animation = _interopRequireDefault(require("../animation/animation.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ImageLoader {
  constructor() {
    const msg = new MessageChannel();
    this.msgPort = msg.port2;
    this.eventSender = msg.port1;
  }

  /** load single image from file*/
  loadImage(imagefile) {
    const imgHeight = 40;
    const imgWidth = 64;
    const scale = 2;
    const img = new Image();
    let bitImg;
    img.src = imagefile;
    img.addEventListener("load", async () => {
      const opt = {
        resizeWidth: imgWidth * scale,
        resizeHeight: imgHeight * scale,
        resizeQuality: "pixelated"
      };
      bitImg = await createImageBitmap(img, opt);
      this.eventSender.postMessage(bitImg);
    });
  }

  /**loads sprites to create animation
   * images are passed by MessageChannel
   * */
  loadSprites(imagefile, animationStates, imgwidth, imgHeight) {
    const img = new Image();
    const animation = new _animation.default(img, "../../res/player_sprites.png", animationStates, imgwidth, imgHeight);
    img.src = imagefile;
    img.addEventListener("load", async () => {
      const animationSets = animation.loadAnimationSets();
      const promisedAnimationSets = await Promise.all(animationSets);
      this.eventSender.postMessage({
        type: "sprites",
        load: promisedAnimationSets
      });
    });
  }
}
exports.default = ImageLoader;