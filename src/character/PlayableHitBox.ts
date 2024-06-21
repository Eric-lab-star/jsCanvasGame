import { Body, Composite, Detector, Events, Vector } from "matter-js";
import BodyKeyMaps from "../inputs/BodyKeyMaps";
import { randomInt } from "../utilz/helper";
import Character from "./Character";

import {
  floatingPlatform3,
  getBlueDiamond,
  getWorldEelement,
  playerHitBox,
} from "../utilz/matterComponents";
import PhysicEnv from "../env/PhysicEnv";
import HitBox from "./HitBox";
import Sword from "../sword/sword";
import StaticHitBox from "./StaticHitBox";

export class PlayableHitBox extends HitBox {
  private platform3Detector: Detector;
  private onFloorDetector: Detector;
  private hitDiamondDetector: Detector;
  public attackSignal: MessageChannel;
  public sword: Sword | undefined;
  public collectedDiamonds: number = 0;
  private blueDiamonds: StaticHitBox[] = [];

  constructor() {
    super();
    this.attackSignal = new MessageChannel();
    this.platform3Detector = Detector.create({
      bodies: [this.body, floatingPlatform3],
    });
    this.onFloorDetector = Detector.create({
      bodies: [this.body, ...getWorldEelement()],
    });
    this.hitDiamondDetector = Detector.create({
      bodies: [this.body],
    });
  }

  protected initBody() {
    const hitxBox = playerHitBox();
    Body.setInertia(hitxBox, Infinity);
    Body.setSpeed(hitxBox, 1);
    return hitxBox;
  }

  public static withKeyBoardInput() {
    const hitBox = new PlayableHitBox();
    BodyKeyMaps.bodyHandler(hitBox);
    return hitBox;
  }

  public static withCharacter(character: Character) {
    const hitBox = PlayableHitBox.withKeyBoardInput();
    hitBox.platform3Hit();
    hitBox.hitDiamond();
    const pos = hitBox.body.position;
    Composite.add(PhysicEnv.World, [hitBox.body]);
    character.updateAnimation(pos, hitBox.attackSignal.port2);
    return hitBox;
  }

  public inputCoolDownSwitch() {
    const id = window.setTimeout(() => {
      this.didRight = !this.didRight;
      this.didLeft = !this.didLeft;
      this.didUp = !this.didUp;
    }, 10000);

    if (this.onFloor()) {
      clearTimeout(id);
      this.didRight = false;
      this.didLeft = false;
      this.didUp = false;
    }
  }

  public platform3Hit() {
    Events.on(PhysicEnv.Engine, "collisionStart", async (e) => {
      const collision = Detector.collisions(this.platform3Detector);
      if (collision.length > 0) {
        const pos = floatingPlatform3.position;
        if (this.blueDiamonds.length < 6) {
          const blueDiamond = await getBlueDiamond(pos, 0, 40);
          this.blueDiamonds.push(blueDiamond);
          const bodies = this.blueDiamonds.map((diamond) => diamond.body);
          Detector.setBodies(this.hitDiamondDetector, [this.body, ...bodies]);
          const rand = randomInt(5, -5);
          Body.setVelocity(blueDiamond.body, { x: rand, y: -5 });
        }
      }
    });
  }

  public hitDiamond() {
    Events.on(PhysicEnv.Engine, "collisionStart", (e) => {
      const collisions = Detector.collisions(this.hitDiamondDetector);
      collisions.forEach((col) => {
        if (col.bodyA.label === "hitBox" && col.bodyB.label === "blueDiamond") {
          this.blueDiamonds.forEach((diamond) => {
            if (diamond.body === col.bodyB) {
              diamond.stopUpdatePosition();
              this.collectedDiamonds++;
              console.log(this.collectedDiamonds);
            }
          });
          this.blueDiamonds = this.blueDiamonds.filter(
            (diamond) => diamond.body !== col.bodyB,
          );
          Composite.remove(PhysicEnv.World, col.bodyB);
        }
      });
    });
  }

  // detect if the body is on the floor
  // TODO:
  public onFloor() {
    const collisions = Detector.collisions(this.onFloorDetector);
    return collisions.length > 0 ? true : false;
  }

  public moveXDirection(newV: Vector, direction: number) {
    const downV = Vector.create(2 * direction, 0);
    newV = Vector.add(newV, downV);
    return newV;
  }

  public moveDown(newV: Vector) {
    const downV = Vector.create(0, 3);
    newV = Vector.add(newV, downV);
    return newV;
  }

  public moveUp(newV: Vector) {
    const upV = Vector.create(0, -7);
    newV = Vector.add(newV, upV);
    return newV;
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

  public setAttack(value: string) {
    this.attackSignal.port1.postMessage({ attack: value });
  }
}
