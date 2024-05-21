import KeyBoardInput from "../inputs/Keyboard";
import Vector2d from "../utilz/Vector2d";
import Character from "./Character";

export default class Captain extends Character {
  private left: boolean = false;
  private right: boolean = false;
  private up: boolean = false;
  private down: boolean = false;

  constructor(ctx: CanvasRenderingContext2D, position: Vector2d) {
    super(
      ctx,
      position,
      captainImgSize.width,
      captainImgSize.height,
      playerStates,
      captainImg,
    );
    this.addKeyListener(new KeyBoardInput(this));
  }

  private addKeyListener(input: KeyBoardInput) {
    addEventListener("keydown", (event: KeyboardEvent) => {
      input.keyPressed(event.key);
      this.moveCaptain();
    });

    addEventListener("keyup", (event: KeyboardEvent) => {
      input.keyReleased(event.key);
      this.moveCaptain();
    });
  }

  private moveCaptain() {
    if (this.isRight()) {
      this.pos.update(this.speed, 0);
    }
    if (this.isLeft()) {
      this.pos.update(-this.speed, 0);
    }
    if (this.isUp()) {
      this.pos.update(0, -this.speed);
    }
    if (this.isDown()) {
      this.pos.update(0, this.speed);
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

const captainImgSize = {
  width: 64,
  height: 40,
};

/**
 *idle: 5,
 *run: 6,
 *jump: 3,
 *fall: 1,
 *hit1: 2,
 *hit2: 3,
 *attack1: 3,
 *attack2: 3,
 *attack3: 3,
 * */
const captainImg = "../../res/player_sprites.png";

export const playerStates = {
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
