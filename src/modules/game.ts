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
    const playerPos = new Vector2d(innerWidth / 2, innerHeight / 2);
    this.player = new Circle(this.ctx, playerPos, 50, "red");
  }

  private loop() {
    let animationTick = 0;
    const runner = () => {
      animationTick += 1 / 10;
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      this.player.handleAnimation(Math.floor(animationTick));
      //this.player.handleImage();
      requestAnimationFrame(() => runner());
    };
    runner();
  }
}

export default Game;
