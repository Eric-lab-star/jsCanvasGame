import { fierceToothAnimationManager, playerAnimationManager, } from "../animationManager/CharactersManager.js";
import Captain from "../character/Capatain.js";
import FierceTooth from "../character/FierceTooth.js";
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
        this.player = new Captain(this.ctx, playerPos);
        this.enemy = new FierceTooth(this.ctx, enemyPos);
    }
    loop() {
        let animationTick = 0;
        const animationSpeed = 10;
        const { idle: playerIdle } = playerAnimationManager.enum();
        const { run: enemyRun } = fierceToothAnimationManager.enum();
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
