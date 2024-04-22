class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getXY() {
        return {
            x: this.x,
            y: this.y,
        };
    }
    update(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}
export default Vector2d;
