import { Circle } from "./Circle.js";

class Projectile extends Circle {
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number = 0,
    y: number = 0,
    radius: number = 20,
    color: string = "black",
  ) {
    super(ctx, x, y, radius, color);
  }
}

export { Projectile };
