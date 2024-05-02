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
        const playerPos = new Vector2d(innerWidth / 2, innerHeight / 2);
        this.player = new Circle(this.ctx, playerPos, 50, "red");
    }
    loop() {
        let animationTick = 0;
        const runner = () => {
            animationTick += 1 / 10;
            this.ctx.clearRect(0, 0, innerWidth, innerHeight);
            this.player.handleAnimation(Math.floor(animationTick));
            requestAnimationFrame(() => runner());
        };
        runner();
    }
}
export default Game;
