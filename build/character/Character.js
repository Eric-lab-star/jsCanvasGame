import Animation from "../animation/animation.js";
import { playerStates } from "../animationManager/playerManager.js";
import ImageLoader from "../image/ImageLoader.js";
import KeyBoardInput from "../inputs/Keyboard.js";
class Character {
    constructor(ctx, position) {
        this.ctx = ctx;
        this.pos = position;
        this.speed = 5;
        this.spriteImage = ImageLoader.playerSprites;
        new KeyBoardInput(this);
    }
    handleAnimation(animationTick, animation) {
        if (this.sprites != undefined) {
            this.drawAnimation(animationTick, animation);
        }
        else {
            this.getSprite();
        }
    }
    drawAnimation(animationTick, animation) {
        const intValue = Math.floor(animationTick / this.sprites[animation].length);
        const modulo = animationTick - this.sprites[animation].length * intValue;
        this.ctx.drawImage(this.sprites[animation][modulo], this.pos.x, this.pos.y);
    }
    getSprite() {
        const loader = new ImageLoader();
        const animation = new Animation(playerStates, 40, 64);
        loader.loadSprites(this.spriteImage, animation);
        loader.msgPort.onmessage = (e) => {
            if (e.data.type == "sprites") {
                this.sprites = e.data.load;
            }
        };
    }
    update(x, y) {
        this.pos.update(x, y);
    }
    setSpeed(s) {
        this.speed = s;
    }
}
export default Character;
