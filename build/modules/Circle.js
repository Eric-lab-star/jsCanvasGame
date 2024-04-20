class Circle {
    constructor(ctx, x, y, radius, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    update(x, y) {
        this.setX(x);
        this.setY(y);
        this.draw();
    }
    setX(delta) {
        this.x += delta;
    }
    setY(delta) {
        this.y += delta;
    }
}
export default Circle;
