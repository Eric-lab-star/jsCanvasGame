import { Circle, circleProps } from "./Circle.js";

interface Iplayer extends circleProps {
  id?: number;
}

const defaultProps: Iplayer = {
  x: 0,
  y: 0,
  radius: 30,
  color: "red",
};

class Player extends Circle {
  constructor(ctx: CanvasRenderingContext2D, props: Iplayer = defaultProps) {
    super(ctx, props);
  }
}

export { Player };
