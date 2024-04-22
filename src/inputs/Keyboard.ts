import Circle from "../modules/Circle.js";

class KeyBoardInput {
  protected component: Circle;
  constructor(component: Circle) {
    this.component = component;
    addEventListener("keydown", (event) => this.move(event));
  }

  move(event: KeyboardEvent) {
    switch (event.key) {
      case "d" || "D":
        this.component.update(1, 0);
        break;
      case "a" || "A":
        this.component.update(-1, 0);
        break;
      default:
        break;
    }
  }
}

export default KeyBoardInput;
