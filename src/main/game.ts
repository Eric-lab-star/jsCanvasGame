import Captain from "../character/Capatain";
import Character from "../character/Character";
import FierceTooth from "../character/FierceTooth";
import GameEnv from "../env/GameEnv";
import Level from "../levels/level";
import Vector2d from "../utilz/Vector2d";

class Game {
  private ctx: CanvasRenderingContext2D;
  private player!: Character;
  private enemy!: FierceTooth;
  private animationSpeed: number;
  private animationTick: number;
  private basicLevel!: Level;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.animationSpeed = 10;
    this.animationTick = 0;
  }

  private initCharacters() {
    const playerPos = new Vector2d(
      GameEnv.GAME_WIDTH / 2,
      GameEnv.GAME_HEIGHT / 2,
    );
    const enemyPos = new Vector2d(
      GameEnv.GAME_WIDTH / 2,
      GameEnv.GAME_HEIGHT / 4,
    );

    this.player = new Captain(this.ctx, playerPos, 2);
    this.enemy = new FierceTooth(this.ctx, enemyPos);
    this.basicLevel = new Level(this.ctx);
  }

  public paint() {
    try {
      this.animationTick += 1 / this.animationSpeed;
      this.ctx.clearRect(0, 0, GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
      this.basicLevel.handleMap();
      this.player.setAnimation();
      // this.enemy.handleAnimation();
    } catch (error) {
      throw error;
    }
  }

  public start() {
    this.initCharacters();
    this.paint();
  }
}

export default Game;
