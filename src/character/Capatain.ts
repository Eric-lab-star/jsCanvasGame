import { Body, Composite, Composites, Detector } from "matter-js";
import AnimationManager from "../animationManager/AnimationManager";
import KeyBoardInput from "../inputs/Keyboard";
import { getURL } from "../utilz/getUrl";
import Character from "./Character";
import GameEnv from "../env/GameEnv";

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
    });

    addEventListener("keyup", (event: KeyboardEvent) => {
      input.keyReleased(event.key);
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
    const xDirection = this.isRight() ? 1 : this.isLeft() ? -1 : 0;
    this.runCaption(xDirection);
    if (this.isUp()) {
      this.jumpCaptain();
    }
  }

  public runCaption(xDirection: number) {
    if (this.hitBox == undefined) {
      throw new Error("hitbox is undefined");
    }

    Body.setVelocity(this.hitBox, { x: xDirection * this.speed, y: -10 });
  }

  public jumpCaptain() {
    if (this.hitBox == undefined) {
      throw new Error("hitbox is undefined");
    }

    Body.setVelocity(this.hitBox, { x: 0, y: -10 });

    // for (let i = 0; i < 100; i++) {
    //   Body.translate(this.hitBox, {
    //     x: 0,
    //     y: -2,
    //   });
    // }
  }

  public isOnAir() {
    if (this.hitBox == undefined) {
      throw new Error("hitbox is undefined");
    }
    const ground = Composite.allBodies(GameEnv.World).find((body) => {
      return body.label == "ground";
    });

    if (ground == undefined) {
      throw new Error("ground is undefined");
    }

    const det = Detector.create({ bodies: [this.hitBox, ground] });
    const collisions = Detector.collisions(det);
    if (collisions.length > 0) {
      return true;
    }
    return false;
  }

  public actionController() {
    if (this.isRight()) {
      this.moveCaptain();
    }
    if (this.isLeft()) {
      this.moveCaptain();
    }
    if (this.isUp()) {
      this.jumpCaptain();
    }
    if (this.isDown()) {
      this.moveCaptain();
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
