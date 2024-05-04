import { fierceToothAnimationManager, playerAnimationManager, } from "../animationManager/CharactersManager.js";
import Captain from "../character/Capatain.js";
import FierceTooth from "../character/FierceTooth.js";
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
        const enemyPos = new Vector2d(innerWidth / 2, innerHeight / 4);
        this.player = new Captain(this.ctx, playerPos, ImageLoader.playerSprites, 64, 40);
        this.enemy = new FierceTooth(this.ctx, enemyPos, ImageLoader.fierceTooth, 68, 34);
    }
    loop() {
        let animationTick = 0;
        const animationSpeed = 10;
        const { idle: playerIdle } = playerAnimationManager.ordinal;
        const { run: enemyRun } = fierceToothAnimationManager.ordinal;
        const runner = () => {
            animationTick += 1 / animationSpeed;
            this.ctx.clearRect(0, 0, innerWidth, innerHeight);
            this.player.handleAnimation(Math.floor(animationTick), playerIdle);
            this.enemy.handleAnimation(Math.floor(animationTick), enemyRun);
            requestAnimationFrame(() => runner());
        };
        runner();
    }
}
export default Game;
