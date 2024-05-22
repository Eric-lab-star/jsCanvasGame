import Captain from "../character/Capatain";
import Character from "../character/Character";
import FierceTooth from "../character/FierceTooth";
import Levels from "../levels/Levels";
import Vector2d from "../utilz/Vector2d";
import { GAME_HEIGHT, GAME_WIDTH } from "./runner";

class Game {
  private ctx: CanvasRenderingContext2D;
  private player!: Character;
  private enemy!: FierceTooth;
  private animationSpeed: number;
  private animationTick: number;
  private level!: Levels;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.animationSpeed = 10;
    this.animationTick = 0;
    this.initCharacters();
  }
  private initCharacters() {
    const playerPos = new Vector2d(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    const enemyPos = new Vector2d(GAME_WIDTH / 2, GAME_HEIGHT / 4);
    this.player = new Captain(this.ctx, playerPos);
    this.enemy = new FierceTooth(this.ctx, enemyPos);
    this.level = new Levels(this.ctx);
  }

  public start() {
    try {
      this.animationTick += 1 / this.animationSpeed;
      this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      this.level.drawImage();
      this.player.handleAnimation(Math.floor(this.animationTick));
      this.enemy.handleAnimation(Math.floor(this.animationTick));
      // requestAnimationFrame(() => this.start());
    } catch (error) {
      throw error;
    }
  }
}

export default Game;
