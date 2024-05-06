"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const animation_js_1 = __importDefault(require("../animation/animation.js"));
const Keyboard_js_1 = __importDefault(require("../inputs/Keyboard.js"));
class Character {
    constructor(ctx, position, imgWidth, imgHeight, animationStates, imgsrc) {
        this.ctx = ctx;
        this.pos = position;
        this.speed = 5;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.animationStates = animationStates;
        this.spriteImage = imgsrc;
        new Keyboard_js_1.default(this);
    }
    handleAnimation(animationTick, animationState) {
        if (this.animation != undefined) {
            this.drawAnimation(animationTick, animationState);
        }
        else {
            this.setAnimation();
        }
    }
    drawAnimation(animationTick, animation) {
        const intValue = Math.floor(animationTick / this.animation[animation].length);
        const modulo = animationTick - this.animation[animation].length * intValue;
        this.ctx.drawImage(this.animation[animation][modulo], this.pos.x, this.pos.y);
    }
    setAnimation() {
        const img = new Image();
        const animation = new animation_js_1.default(img, this.spriteImage, this.animationStates, this.imgWidth, this.imgHeight);
        img.addEventListener("load", () => __awaiter(this, void 0, void 0, function* () {
            const animationSets = animation.loadAnimationSets();
            this.animation = yield Promise.all(animationSets);
        }));
    }
    update(x, y) {
        this.pos.update(x, y);
    }
    setSpeed(s) {
        this.speed = s;
    }
}
exports.default = Character;
