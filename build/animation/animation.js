var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AnimationManager from "../animationManager/AnimationManager.js";
class Animation {
    constructor(frameInfoObj, imgHeight, imgWidth) {
        this.manager = new AnimationManager(frameInfoObj);
        this.imgHeight = imgHeight;
        this.imgWidth = imgWidth;
        this.opt = {
            resizeWidth: this.imgWidth * Animation.scale,
            resizeHeight: this.imgHeight * Animation.scale,
            resizeQuality: "pixelated",
        };
    }
    loadAnimationSets(img) {
        const animationSets = this.manager.values.map((x, y) => __awaiter(this, void 0, void 0, function* () {
            const animation = this.loader(x, y, img);
            return Promise.all(animation);
        }));
        return animationSets;
    }
    loader(x, y, img) {
        const imgs = [];
        for (let i = 0; i < x; i++) {
            imgs.push(this.createImageBitmap(img, i, y));
        }
        return imgs;
    }
    createImageBitmap(img, x, y) {
        return createImageBitmap(img, this.imgWidth * x, this.imgHeight * y, this.imgWidth, this.imgHeight, this.opt);
    }
}
Animation.scale = 2;
export default Animation;
