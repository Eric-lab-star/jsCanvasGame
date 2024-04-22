import Circle from "./Circle.js";
import Vector2d from "./Vector2d.js";
class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.initCharacters();
    }
    start() {
        this.loop();
    }
    initCharacters() {
        const playerPos = new Vector2d(100, 100);
        this.player = new Circle(this.ctx, playerPos, 100, "red");
    }
    loop() {
        const runner = () => {
            this.ctx.clearRect(0, 0, innerWidth, innerHeight);
            this.player.draw();
            requestAnimationFrame(() => runner());
        };
        runner();
    }
}
export default Game;
