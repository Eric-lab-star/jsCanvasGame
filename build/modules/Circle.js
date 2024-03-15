var Circle = (function () {
    function Circle(ctx, _a) {
        var x = _a.x, y = _a.y, radius = _a.radius, color = _a.color;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    Circle.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };
    return Circle;
}());
export { Circle };
//# sourceMappingURL=Circle.js.map