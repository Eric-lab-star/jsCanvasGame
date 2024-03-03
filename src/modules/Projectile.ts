import { circleProps, Circle } from "./Circle.js";

interface projectileProps extends circleProps {
  id?: number;
}

class Projectile extends Circle {
  constructor(props: projectileProps, ctx: CanvasRenderingContext2D) {
    super(ctx, props);
  }
}

export { Projectile };
