"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CharactersManager_js_1 = require("../animationManager/CharactersManager.js");
const Capatain_js_1 = __importDefault(require("../character/Capatain.js"));
const FierceTooth_js_1 = __importDefault(require("../character/FierceTooth.js"));
const Vector2d_js_1 = __importDefault(require("./Vector2d.js"));
class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.initCharacters();
    }
    start() {
        this.loop();
    }
    initCharacters() {
        const playerPos = new Vector2d_js_1.default(innerWidth / 2, innerHeight / 2);
        const enemyPos = new Vector2d_js_1.default(innerWidth / 2, innerHeight / 4);
        this.player = new Capatain_js_1.default(this.ctx, playerPos);
        this.enemy = new FierceTooth_js_1.default(this.ctx, enemyPos);
    }
    loop() {
        let animationTick = 0;
        const animationSpeed = 10;
        const { idle: playerIdle } = CharactersManager_js_1.playerAnimationManager.enum();
        const { run: enemyRun } = CharactersManager_js_1.fierceToothAnimationManager.enum();
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
exports.default = Game;
