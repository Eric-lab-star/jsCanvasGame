"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CharactersManager = require("../animationManager/CharactersManager.js");
var _Capatain = _interopRequireDefault(require("../character/Capatain.js"));
var _FierceTooth = _interopRequireDefault(require("../character/FierceTooth.js"));
var _Vector2d = _interopRequireDefault(require("./Vector2d.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.initCharacters();
  }
  start() {
    this.loop();
  }
  initCharacters() {
    const playerPos = new _Vector2d.default(innerWidth / 2, innerHeight / 2);
    const enemyPos = new _Vector2d.default(innerWidth / 2, innerHeight / 4);
    this.player = new _Capatain.default(this.ctx, playerPos);
    this.enemy = new _FierceTooth.default(this.ctx, enemyPos);
  }
  loop() {
    let animationTick = 0;
    const animationSpeed = 10;
    const {
      idle: playerIdle
    } = _CharactersManager.playerAnimationManager.enum();
    const {
      run: enemyRun
    } = _CharactersManager.fierceToothAnimationManager.enum();
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
var _default = exports.default = Game;