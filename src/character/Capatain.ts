import AnimationManager from "../animation/animationManager/AnimationManager";
import KeyBoardInput from "../inputs/Keyboard";
import { getURL } from "../utilz/getUrl";
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

  private static captainImg = getURL("../res/player_sprites.png");

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
  public static aniStates = new AnimationManager(Captain.states);

  constructor() {
    super(
      Captain.captainImgSize.width,
      Captain.captainImgSize.height,
      Captain.aniStates.frames(),
      Captain.captainImg,
      2,
    );
    this.addKeyListener(new KeyBoardInput(this));
    this.hitBox = this.setHitBox(100, 100, 15, 0);
  }

  private addKeyListener(input: KeyBoardInput) {
    addEventListener("keydown", (event: KeyboardEvent) => {
      input.keyPressed(event.key);
      // this.moveCaptain();
    });

    addEventListener("keyup", (event: KeyboardEvent) => {
      input.keyReleased(event.key);
      // this.moveCaptain();
    });

    addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.animationState = Captain.aniStates.enum("idle");
      }
    });
  }

  public setAnimationState(state: number) {
    this.animationState = state;
  }

  /// controls
  public moveCaptain() {
    if (this.hitBox == undefined) {
      throw new Error("hitbox is undefine");
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
