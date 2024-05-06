"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimationManager_js_1 = __importDefault(require("../animationManager/AnimationManager.js"));
class Animation {
    constructor(image, spriteImage, stateInfo, imgWidth, imgHeight) {
        this.image = image;
        this.spriteImage = spriteImage;
        this.frames = new AnimationManager_js_1.default(stateInfo).frames();
        this.imgHeight = imgHeight;
        this.imgWidth = imgWidth;
        this.opt = {
            resizeWidth: this.imgWidth * Animation.scale,
            resizeHeight: this.imgHeight * Animation.scale,
            resizeQuality: "pixelated",
        };
        this.image.src = this.spriteImage;
    }
    loadAnimationSets() {
        const animationSets = this.frames.map((x, y) => this.mapHandler(x, y));
        return animationSets;
    }
    mapHandler(x, y) {
        const animation = this.loadAnimation(x, y);
        return Promise.all(animation);
    }
    loadAnimation(x, y) {
        const imgs = [];
        for (let i = 0; i < x; i++) {
            imgs.push(this.createImageBitmap(i, y));
        }
        return imgs;
    }
    createImageBitmap(x, y) {
        return createImageBitmap(this.image, this.imgWidth * x, this.imgHeight * y, this.imgWidth, this.imgHeight, this.opt);
    }
}
Animation.scale = 2;
exports.default = Animation;
