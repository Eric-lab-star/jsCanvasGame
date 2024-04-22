import Circle from "./Circle.js";
import Vector2d from "./Vector2d.js";

class Game {
  private ctx: CanvasRenderingContext2D;
  private player: Circle;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.initCharacters();
  }

  public start() {
    this.loop();
  }

  public initCharacters() {
    const playerPos = new Vector2d(100, 100);
    this.player = new Circle(this.ctx, playerPos, 100, "red");
  }

  private loop() {
    const runner = () => {
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      this.player.draw();
      requestAnimationFrame(() => runner());
    };
    runner();
  }
}

export default Game;
