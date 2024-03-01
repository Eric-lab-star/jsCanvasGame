import { circleProps, Circle } from "./Circle.js";

interface projectileProps extends circleProps {
  id?: number;
}
class Projectile extends Circle {
  constructor(projectileProps: projectileProps) {
    super(projectileProps);
  }
}

export { Projectile, projectileProps };
