import { Circle, circleProps } from "./Circle.js";

interface playerProps extends circleProps {
  id?: number;
}
class Player extends Circle {
  constructor(playerProps: playerProps) {
    super(playerProps);
  }
}

export { playerProps, Player };
