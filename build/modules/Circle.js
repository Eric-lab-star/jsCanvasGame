import ImageLoader from "../image/ImageLoader.js";
import KeyBoardInput from "../inputs/Keyboard.js";
class Circle {
    constructor(ctx, position, size, color) {
        this.ctx = ctx;
        this.pos = position;
        this.size = size;
        this.color = color;
        this.speed = 30;
        new KeyBoardInput(this);
    }
    handleAnimation(i) {
        if (this.sprites != undefined) {
            this.drawAnimation(i);
        }
        else {
            this.getSprite();
        }
    }
    getSprite() {
        const loader = new ImageLoader();
        loader.loadSprites(ImageLoader.Sprites);
        loader.msgPort.onmessage = (e) => {
            if (e.data.type == "sprites") {
                this.sprites = e.data.load;
            }
        };
    }
    drawAnimation(i) {
        const intValue = Math.floor(i / this.sprites.length);
        const index = i - this.sprites.length * intValue;
        this.ctx.drawImage(this.sprites[index], this.pos.x, this.pos.y);
    }
    handleSprite() {
        if (this.img != undefined) {
            this.drawImage();
        }
        else {
            this.getSprite();
        }
    }
    handleImage() {
        if (this.img != undefined) {
            this.drawImage();
        }
        else {
            this.getImage();
        }
    }
    getImage() {
        const loader = new ImageLoader();
        loader.load(ImageLoader.Runsword01);
        loader.msgPort.onmessage = (e) => {
            this.img = e.data;
            this.drawImage();
        };
    }
    drawImage() {
        this.ctx.drawImage(this.img, this.pos.x, this.pos.y);
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, true);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    update(x, y) {
        this.pos.update(x, y);
        this.drawImage();
    }
    setSpeed(s) {
        this.speed = s;
    }
}
export default Circle;
