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
    drawSprite() {
        if (this.img != undefined) {
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y);
        }
        else {
            const loader = new ImageLoader();
            loader.loadSprites(ImageLoader.Sprites);
            loader.msgPort.onmessage = (e) => {
                console.log(e.data);
                this.img = e.data[0];
            };
        }
    }
    getImage() {
        const loader = new ImageLoader();
        loader.load(ImageLoader.Runsword01);
        loader.msgPort.onmessage = (e) => {
            console.log(e.data);
            this.img = e.data;
        };
    }
    drawImage() {
        if (this.img != undefined) {
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y);
        }
        else {
            console.log(this.img);
        }
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
