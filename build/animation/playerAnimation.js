var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PlayerAnimation {
    constructor() { }
    static loadAnimationSets(img) {
        const animationSets = PlayerAnimation.states.map((x, y) => __awaiter(this, void 0, void 0, function* () {
            const animation = PlayerAnimation.loader(x, y, img);
            return Promise.all(animation);
        }));
        return animationSets;
    }
    static loader(x, y, img) {
        const imgs = [];
        for (let i = 0; i < x; i++) {
            imgs.push(PlayerAnimation.createImageBitmap(img, i, y));
        }
        return imgs;
    }
    static createImageBitmap(img, x, y) {
        return createImageBitmap(img, PlayerAnimation.imgWidth * x, PlayerAnimation.imgHeight * y, PlayerAnimation.imgWidth, PlayerAnimation.imgHeight, PlayerAnimation.opt);
    }
}
PlayerAnimation.idle = 0;
PlayerAnimation.run = 1;
PlayerAnimation.jump = 2;
PlayerAnimation.fall = 3;
PlayerAnimation.hit1 = 4;
PlayerAnimation.hit2 = 5;
PlayerAnimation.attack1 = 6;
PlayerAnimation.attack2 = 7;
PlayerAnimation.attack3 = 8;
PlayerAnimation.states = [5, 6, 3, 1, 2, 3, 3, 3, 3];
PlayerAnimation.imgHeight = 40;
PlayerAnimation.imgWidth = 64;
PlayerAnimation.scale = 2;
PlayerAnimation.opt = {
    resizeWidth: PlayerAnimation.imgWidth * PlayerAnimation.scale,
    resizeHeight: PlayerAnimation.imgHeight * PlayerAnimation.scale,
    resizeQuality: "pixelated",
};
export default PlayerAnimation;
