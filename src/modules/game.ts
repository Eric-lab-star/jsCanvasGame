import Circle from "./Circle.js";

class Game {
  public ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public start() {
    this.loop();
  }

  public loop() {
    const circle = new Circle(this.ctx, 100, 100, 100, "red");
    const runner = () => {
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      circle.update(1, 1);
      requestAnimationFrame(() => runner());
    };
    runner();
  }
}

export default Game;
