import BodyKeyMaps, { KeyBoardListener } from "../inputs/BodyKeyMaps";

export class keyListener implements KeyBoardListener {
  public left: boolean;
  public right: boolean;
  public up: boolean;
  public down: boolean;

  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }

  public addKeyBoardInput() {
    const controller = new BodyKeyMaps(this);
    addEventListener("keydown", (event: KeyboardEvent) => {
      controller.keyDown(event.key);

      console.log(event.key);
    });
    addEventListener("keyup", (event: KeyboardEvent) => {
      controller.keyUp(event.key);

      console.log(event.key);
    });
  }

  public setRight(value: boolean) {
    this.right = value;
  }
  public setLeft(value: boolean) {
    this.left = value;
  }
  public setUp(value: boolean) {
    this.up = value;
  }
  public setDown(value: boolean) {
    this.down = value;
  }
}
