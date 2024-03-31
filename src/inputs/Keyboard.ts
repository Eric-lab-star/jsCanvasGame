import { Player } from "../modules/Player.js";

class Input {
  protected component: Player;
  private xSpeed: number = 10;
  private ySpeed: number = 10;
  constructor(component: Player) {
    this.component = component;
  }

  Keyboard(): void {
    addEventListener("keydown", this.keyDownHandler.bind(this));
    return;
  }

  keyDownHandler(event: KeyboardEvent) {
    switch (event.key) {
      case "w":
        this.component.setY(-this.ySpeed);
        this.component.update();
        break;
      case "a":
        this.component.setX(-this.xSpeed);
        this.component.update();
        break;
      case "s":
        this.component.setY(+this.ySpeed);
        this.component.update();
        console.log("down");
        break;
      case "d":
        this.component.setX(+this.xSpeed);
        this.component.update();
        break;
    }
  }
}

export { Input };
