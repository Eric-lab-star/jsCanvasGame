import Circle from "./Circle.js";
import Vector2d from "./Vector2d.js";

class Projectile extends Circle {
  constructor(
    ctx: CanvasRenderingContext2D,
    pos: Vector2d,
    radius: number = 20,
    color: string = "black",
  ) {
    super(ctx, pos, radius, color);
  }
}

export { Projectile };
