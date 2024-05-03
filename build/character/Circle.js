import ImageLoader from "../image/ImageLoader.js";
import KeyBoardInput from "../inputs/Keyboard.js";
class Circle {
    constructor(ctx, position, size) {
        this.ctx = ctx;
        this.pos = position;
        this.size = size;
        this.speed = 5;
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
        loader.loadSprites(ImageLoader.playerSprites);
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
export default Circle;
