import { circleArgs, Circle } from "./Circle.js";

interface projectileArgs extends circleArgs {
  id?: number;
}
class Projectile extends Circle {
  constructor(projectileArgs: projectileArgs) {
    super(projectileArgs);
  }
}

export { Projectile };
