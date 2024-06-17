import { Body, Vector } from "matter-js";
import { HitBox } from "../character/HitBox";

export default class BodyKeyMaps {
  public hitbox: HitBox;
  constructor(hitBox: HitBox) {
    this.hitbox = hitBox;
  }

  public static bodyHandler(hitBox: HitBox) {
    const keymapper = new BodyKeyMaps(hitBox);
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      keymapper.keyDown(hitBox, e.key);
    });
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      keymapper.keyUp(hitBox, e.key);
    });
  }

  private static newV = Vector.create(0, 0);

  private keyDown(hitBox: HitBox, key: string) {
    if (hitBox.onFloor()) {
      hitBox.didRight = false;
      hitBox.didLeft = false;
      hitBox.didUp = false;
    }
    hitBox.hitCoin();

    switch (true) {
      case this.attackKey2(key):
        hitBox.setAttack("attack2S");
        break;
      case this.attackKey(key):
        hitBox.setAttack("attack1S");
        break;
      case this.rightKey(key):
        if (!hitBox.didRight) {
          hitBox.didRight = true;
          this.xDirectionHandler(hitBox, 1);
        }
        break;
      case this.leftKey(key):
        if (!hitBox.didLeft) {
          hitBox.didLeft = true;
          this.xDirectionHandler(hitBox, -1);
        }
        break;

      case this.upKey(key):
        if (hitBox.onFloor()) {
          BodyKeyMaps.newV = Vector.create(0, 0);
          BodyKeyMaps.newV = hitBox.moveUp(BodyKeyMaps.newV);
          Body.setVelocity(hitBox.body, BodyKeyMaps.newV);
        }
        break;

      case this.downKey(key):
        if (hitBox.onFloor()) {
          BodyKeyMaps.newV = Vector.create(0, 0);
          BodyKeyMaps.newV = hitBox.moveDown(BodyKeyMaps.newV);
          Body.setVelocity(hitBox.body, BodyKeyMaps.newV);
        }
        break;

      case this.reloadKey(key):
        location.reload();
        break;
      default:
        break;
    }
  }

  private keyUp(body: HitBox, key: string) {
    switch (true) {
      case this.attackKey(key):
      case this.attackKey2(key):
        body.setAttack("");
        break;
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

  private attackKey2(key: string) {
    return key === "l" || key === "L" || key === "ㅣ";
  }
  private attackKey(key: string) {
    return key === "k" || key === "K" || key === "ㅏ";
  }

  private rightKey(key: string) {
    return key === "D" || key === "ㅇ" || key === "d";
  }

  private leftKey(key: string) {
    return key === "a" || key === "A" || key === "ㅁ";
  }

  private upKey(key: string) {
    return key === "w" || key === "W" || key === "ㅈ";
  }
  private downKey(key: string) {
    return key === "s" || key === "S" || key === "ㄴ";
  }
  private reloadKey(key: string) {
    return key === "r" || key === "R" || key === "ㄱ";
  }

  private xDirectionHandler(body: HitBox, direction: 1 | -1) {
    this.xMove(body, direction);
    body.inputCoolDownSwitch();
  }

  private xMove(hitBox: HitBox, direction: 1 | -1) {
    BodyKeyMaps.newV = hitBox.onFloor()
      ? Vector.create(0, 0)
      : BodyKeyMaps.newV;
    BodyKeyMaps.newV = hitBox.moveXDirection(BodyKeyMaps.newV, direction);
    Body.setVelocity(hitBox.body, BodyKeyMaps.newV);
    BodyKeyMaps.newV = Vector.create(0, 0);
  }
}
