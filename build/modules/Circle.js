import KeyBoardInput from "../inputs/Keyboard.js";
class Circle {
    constructor(ctx, vector2d, radius, color) {
        this.ctx = ctx;
        this.vector2d = vector2d;
        this.radius = radius;
        this.color = color;
        new KeyBoardInput(this);
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.vector2d.x, this.vector2d.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    update(x, y) {
        this.vector2d.update(x, y);
        this.draw();
    }
}
export default Circle;
