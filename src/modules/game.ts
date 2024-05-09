import {
  fierceToothAnimationManager,
  playerAnimationManager,
} from "../animationManager/CharactersManager";
import Captain from "../character/Capatain";
import Character from "../character/Character";
import FierceTooth from "../character/FierceTooth";
import Vector2d from "./Vector2d";

class Game {
  private ctx: CanvasRenderingContext2D;
  private player: Character;
  private enemy: FierceTooth;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.initCharacters();
  }

  public start() {
    this.loop();
  }

  public initCharacters() {
    const playerPos = new Vector2d(innerWidth / 2, innerHeight / 2);
    const enemyPos = new Vector2d(innerWidth / 2, innerHeight / 4);
    this.player = new Captain(this.ctx, playerPos);
    this.enemy = new FierceTooth(this.ctx, enemyPos);
  }

  private loop() {
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
