import { Bodies, Body, Composite, Detector, Vector } from "matter-js";
import BodyKeyMaps from "../inputs/BodyKeyMaps";
import { randomColor, randomInt } from "../utilz/helper";
import Character from "./Character";

import { floatingPlatform3, getWorldEelement } from "../utilz/matterComponents";
import PhysicEnv from "../env/PhysicEnv";
import TextureBodyRect from "../utilz/TextureBody";

///images
import BlueDiamond1 from "../res/world/64px/Blue Diamond/01.png";
import BlueDiamond2 from "../res/world/64px/Blue Diamond/02.png";
import BlueDiamond3 from "../res/world/64px/Blue Diamond/03.png";

export class HitBox {
  public body: Body;
  public right: boolean;
  public left: boolean;
  public up: boolean;
  public down: boolean;
  public didRight: boolean;
  public didLeft: boolean;
  public didUp: boolean;
  private platform3Detector: Detector;
  private onFloorDetector: Detector;
  private hitDiamondDetector: Detector;
  public attackSignal: MessageChannel;

  constructor() {
    this.body = this.initBody();
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;
    this.didRight = false;
    this.didLeft = false;
    this.didUp = false;
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
  private initBody() {
    const box = Bodies.rectangle(1000, 513, 45, 45, {
      render: {
        fillStyle: randomColor(),
        opacity: 0.5,
      },
      friction: 0.5,
      label: "hitBox",
    });
    Body.setInertia(box, Infinity);
    Body.setSpeed(box, 1);
    return box;
  }

  public static withKeyBoardInput() {
    const hitBox = new HitBox();
    BodyKeyMaps.bodyHandler(hitBox);
    return hitBox;
  }

  public static withCharacter(character: Character) {
    const hitBox = HitBox.withKeyBoardInput();
    hitBox.platform3Hit();
    const pos = hitBox.body.position;
    hitBox.swordBox(pos.x, pos.y);
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

  private platform3Hit() {
    const collision = Detector.collisions(this.platform3Detector);
    if (collision.length > 0) {
      const allBodies = Composite.allBodies(PhysicEnv.World);
      const blueDiamonds = allBodies.filter(
        (body) => body.label === "blueDiamond",
      );
      if (blueDiamonds.length < 6) {
        const blueDiamond = new TextureBodyRect(
          "blueDiamond",
          [BlueDiamond1, BlueDiamond2, BlueDiamond3],
          1090,
          460,
          20,
          20,
        );
        Detector.setBodies(this.hitDiamondDetector, [
          this.body,
          ...blueDiamonds,
          blueDiamond.body,
        ]);
        const rand = randomInt(3, -3);
        Body.setVelocity(blueDiamond.body, { x: rand, y: -5 });
        Body.setMass(blueDiamond.body, 1);
        Composite.add(PhysicEnv.World, blueDiamond.body);
      }
    }
    requestAnimationFrame(() => this.platform3Hit());
  }

  public hitDiamond() {
    const collisions = Detector.collisions(this.hitDiamondDetector);
    collisions.forEach((col) => {
      if (col.bodyA.label === "hitBox" && col.bodyB.label === "blueDiamond") {
        Composite.remove(PhysicEnv.World, col.bodyB);
      }
    });
  }

  // detect if the body is on the floor
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

  private swordBox(x: number, y: number) {
    const sword = Bodies.rectangle(x, y, 20, 10, {
      render: {
        fillStyle: randomColor(),
        opacity: 0.5,
      },
      label: "swordBox",
    });
    Body.setInertia(sword, Infinity);
    Body.setSpeed(sword, 1);
    return sword;
  }
}
