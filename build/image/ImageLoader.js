var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ImageLoader {
    constructor() {
        const msg = new MessageChannel();
        this.msgPort = msg.port2;
        this.eventSender = msg.port1;
    }
    loadImage(imagefile) {
        const imgHeight = 40;
        const imgWidth = 64;
        const scale = 2;
        const img = new Image();
        let bitImg;
        img.src = imagefile;
        img.addEventListener("load", () => __awaiter(this, void 0, void 0, function* () {
            const opt = {
                resizeWidth: imgWidth * scale,
                resizeHeight: imgHeight * scale,
                resizeQuality: "pixelated",
            };
            bitImg = yield createImageBitmap(img, opt);
            this.eventSender.postMessage(bitImg);
        }));
    }
    loadSprites(imagefile, Character) {
        const img = new Image();
        img.src = imagefile;
        img.addEventListener("load", () => __awaiter(this, void 0, void 0, function* () {
            const animationSets = Character.loadAnimationSets(img);
            const promisedAnimationSets = yield Promise.all(animationSets);
            this.eventSender.postMessage({
                type: "sprites",
                load: promisedAnimationSets,
            });
        }));
    }
}
ImageLoader.Runsword01 = "../../res/10-Run Sword/RunSword01.png";
ImageLoader.playerSprites = "../../res/player_sprites.png";
ImageLoader.fierceTooth = "../../res/fierce_tooth.png";
export default ImageLoader;
