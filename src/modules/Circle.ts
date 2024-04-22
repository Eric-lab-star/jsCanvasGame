import KeyBoardInput from "../inputs/Keyboard.js";
import Vector2d from "./Vector2d.js";

class Circle {
  protected ctx: CanvasRenderingContext2D;
  protected vector2d: Vector2d;
  protected radius: number;
  protected color: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    vector2d: Vector2d,
    radius: number,
    color: string,
  ) {
    this.ctx = ctx;
    this.vector2d = vector2d;
    this.radius = radius;
    this.color = color;
    new KeyBoardInput(this);
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.vector2d.x,
      this.vector2d.y,
      this.radius,
      0,
      Math.PI * 2,
      true,
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  public update(x: number, y: number) {
    this.vector2d.update(x, y);
    this.draw();
  }
}

export default Circle;
