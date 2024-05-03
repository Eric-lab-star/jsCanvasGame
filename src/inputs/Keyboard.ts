import Character from "../character/Character.js";

class KeyBoardInput {
  protected component: Character;
  constructor(component: Character) {
    this.component = component;
    addEventListener("keydown", (event) => this.move(event));
  }

  move(event: KeyboardEvent) {
    switch (event.key) {
      case "d" || "D":
        this.component.update(this.component.speed, 0);
        break;
      case "a" || "A":
        this.component.update(-this.component.speed, 0);
        break;
      default:
        break;
    }
  }
}

export default KeyBoardInput;
