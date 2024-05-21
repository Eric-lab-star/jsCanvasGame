import {
  fierceToothAnimationManager,
  playerAnimationManager,
} from "../animationManager/CharactersManager";
import Captain from "../character/Capatain";
import Character from "../character/Character";
import FierceTooth from "../character/FierceTooth";
import Vector2d from "../utilz/Vector2d";

class Game {
  private ctx: CanvasRenderingContext2D;
  //
  private player: Character;
  private enemy: FierceTooth;
  private animationSpeed: number;
  private animationTick: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    const playerPos = new Vector2d(innerWidth / 2, innerHeight / 2);
    const enemyPos = new Vector2d(innerWidth / 2, innerHeight / 4);
    this.player = new Captain(this.ctx, playerPos);
    this.enemy = new FierceTooth(this.ctx, enemyPos);
    this.animationSpeed = 10;
    this.animationTick = 0;
  }

  public start() {
    const { idle: playerIdle } = playerAnimationManager.enum();
    const { run: enemyRun } = fierceToothAnimationManager.enum();
    try {
      this.animationTick += 1 / this.animationSpeed;
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      this.player.handleAnimation(Math.floor(this.animationTick), playerIdle);
      this.enemy.handleAnimation(Math.floor(this.animationTick), enemyRun);
      requestAnimationFrame(() => this.start());
    } catch (error) {
      throw error;
    }
  }
}

export default Game;
