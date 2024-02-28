import { Circle, circleArgs } from "./Circle.js";

interface playerArgs extends circleArgs {
  id?: number;
}
class Player extends Circle {
  constructor(playerArgs: playerArgs) {
    super(playerArgs);
  }
}

export default Player;
