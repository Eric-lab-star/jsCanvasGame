import { Body, Vector } from "matter-js";
import { HitBox } from "../character/HitBox";

export default class BodyKeyMaps {
  public hitbox: HitBox;
  constructor(hitBox: HitBox) {
    this.hitbox = hitBox;
  }

  public static keyBoardHanlder(body: HitBox) {
    const keymapper = new BodyKeyMaps(body);
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      keymapper.keyDown(body, e.key);
    });
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      keymapper.keyUp(body, e.key);
    });
  }

  private static newV = Vector.create(0, 0);

  public keyDown(body: HitBox, key: string) {
    if (body.onFloor()) {
      body.didRight = false;
      body.didLeft = false;
      body.didUp = false;
    }

    switch (true) {
      case this.rightKey(key):
        if (!body.didRight) {
          body.didRight = true;
          this.xDirectionHandler(body, 1);
        }
        break;
      case this.leftKey(key):
        if (!body.didLeft) {
          body.didLeft = true;
          this.xDirectionHandler(body, -1);
        }
        break;

      case this.upKey(key):
        if (body.onFloor()) {
          BodyKeyMaps.newV = Vector.create(0, 0);
          BodyKeyMaps.newV = body.moveUp(BodyKeyMaps.newV);
          Body.setVelocity(body.getBody(), BodyKeyMaps.newV);
        }
        break;

      case this.downKey(key):
        if (body.onFloor()) {
          BodyKeyMaps.newV = Vector.create(0, 0);
          BodyKeyMaps.newV = body.moveDown(BodyKeyMaps.newV);
          Body.setVelocity(body.getBody(), BodyKeyMaps.newV);
        }
        break;

      case this.reloadKey(key):
        location.reload();
        break;
      default:
        break;
    }
  }

  public keyUp(body: HitBox, key: string) {
    switch (true) {
      case this.rightKey(key):
        body.setRight(false);
        break;
      case this.leftKey(key):
        body.setLeft(false);
        break;
      case this.upKey(key):
        body.setUp(false);
        break;
      case this.downKey(key):
        body.setDown(false);
        break;
      default:
        break;
    }
  }

  public rightKey(key: string) {
    return key === "D" || key === "ㅇ" || key === "d";
  }

  public leftKey(key: string) {
    return key === "a" || key === "A" || key === "ㅁ";
  }

  public upKey(key: string) {
    return key === "w" || key === "W" || key === "ㅈ";
  }
  public downKey(key: string) {
    return key === "s" || key === "S" || key === "ㄴ";
  }
  public reloadKey(key: string) {
    return key === "r" || key === "R" || key === "ㄱ";
  }

  public xDirectionHandler(body: HitBox, direction: 1 | -1) {
    this.xMove(body, direction);
    body.inputCoolDownSwitch(body);
  }

  private xMove(body: HitBox, direction: 1 | -1) {
    BodyKeyMaps.newV = body.onFloor() ? Vector.create(0, 0) : BodyKeyMaps.newV;
    BodyKeyMaps.newV = body.moveXDirection(BodyKeyMaps.newV, direction);
    Body.setVelocity(body.getBody(), BodyKeyMaps.newV);
    BodyKeyMaps.newV = Vector.create(0, 0);
  }
}
