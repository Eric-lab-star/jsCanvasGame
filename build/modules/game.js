import PlayerAnimation from "../animation/playerAnimation.js";
import Captain from "../character/Capatain.js";
import ImageLoader from "../image/ImageLoader.js";
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
        this.player = new Captain(this.ctx, playerPos, 50, ImageLoader.playerSprites);
    }
    loop() {
        let animationTick = 0;
        const animationSpeed = 10;
        const runner = () => {
            animationTick += 1 / animationSpeed;
            this.ctx.clearRect(0, 0, innerWidth, innerHeight);
            this.player.handleAnimation(Math.floor(animationTick), PlayerAnimation.run);
            requestAnimationFrame(() => runner());
        };
        runner();
    }
}
export default Game;
