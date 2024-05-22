import AnimationManager from "../animationManager/AnimationManager";
import KeyBoardInput from "../inputs/Keyboard";
import Vector2d from "../utilz/Vector2d";
import Character from "./Character";

export default class Captain extends Character {
  private left: boolean = false;
  private right: boolean = false;
  private up: boolean = false;
  private down: boolean = false;
  private static captainImgSize = {
    width: 64,
    height: 40,
  };

  private static captainImg = "../../res/player_sprites.png";

  private static states = {
    idle: 5,
    run: 6,
    jump: 3,
    fall: 1,
    hit1: 2,
    hit2: 3,
    attack1: 3,
    attack2: 3,
    attack3: 3,
  };

  private static aniStates = new AnimationManager(Captain.states);

  constructor(ctx: CanvasRenderingContext2D, position: Vector2d) {
    super(
      ctx,
      position,
      Captain.captainImgSize.width,
      Captain.captainImgSize.height,
      Captain.aniStates.frames(),
      Captain.captainImg,
    );
    this.addKeyListener(new KeyBoardInput(this));
  }

  private addKeyListener(input: KeyBoardInput) {
    addEventListener("keydown", (event: KeyboardEvent) => {
      input.keyPressed(event.key);
      this.moveCaptain();
      this.animationState = Captain.aniStates.enum("run");
    });

    addEventListener("keyup", (event: KeyboardEvent) => {
      input.keyReleased(event.key);
      this.moveCaptain();
      this.animationState = Captain.aniStates.enum("idle");
    });
  }

  private moveCaptain() {
    const normal = Vector2d.normalize(new Vector2d(this.speed, this.speed));
    const xDirection = this.isRight() ? 1 : this.isLeft() ? -1 : 0;
    const yDirection = this.isDown() ? 1 : this.isUp() ? -1 : 0;

    if (xDirection !== 0 && yDirection !== 0) {
      this.pos.update(
        normal.x * this.speed * xDirection,
        normal.y * this.speed * yDirection,
      );
    } else {
      this.pos.update(this.speed * xDirection, this.speed * yDirection);
    }
  }

  public setLeft(bool: boolean) {
    this.left = bool;
  }

  public isLeft() {
    return this.left;
  }

  public setRight(bool: boolean) {
    this.right = bool;
  }

  public isRight() {
    return this.right;
  }

  public setUp(bool: boolean) {
    this.up = bool;
  }

  public isUp() {
    return this.up;
  }

  public setDown(bool: boolean) {
    this.down = bool;
  }

  public isDown() {
    return this.down;
  }
}
