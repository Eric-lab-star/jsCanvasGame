import Circle from "./Circle.js";
class Game {
    constructor(ctx) {
        this.ctx = ctx;
    }
    start() {
        this.loop();
    }
    loop() {
        const circle = new Circle(this.ctx, 100, 100, 100, "red");
        const runner = () => {
            this.ctx.clearRect(0, 0, innerWidth, innerHeight);
            circle.update(1, 1);
            requestAnimationFrame(() => runner());
        };
        runner();
    }
}
export default Game;
