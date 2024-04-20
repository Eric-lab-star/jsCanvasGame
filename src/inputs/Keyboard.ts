import { Player } from "../modules/Player.js";

class Input {
  protected component: Player;
  constructor(component: Player) {
    this.component = component;
  }

  Keyboard(): void {
    return;
  }
}

export { Input };
