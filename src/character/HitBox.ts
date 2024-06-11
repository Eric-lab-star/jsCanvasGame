import { Bodies, Body, Composite, Detector, Vector } from "matter-js";
import BodyKeyMaps from "../inputs/BodyKeyMaps";
import { randomColor } from "../utilz/helper";
import PhysicEnv from "../env/PhysicEnv";
import Character from "./Character";
import { base } from "../utilz/matterComponents";

export class HitBox {
  public body: Body;
  public right: boolean;
  public left: boolean;
  public up: boolean;
  public down: boolean;
  public didRight: boolean;
  public didLeft: boolean;
  public didUp: boolean;

  constructor() {
    this.body = this.initBody();
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;
    this.didRight = false;
    this.didLeft = false;
    this.didUp = false;
  }

  public static withKeyBoardInput() {
    const hitBox = new HitBox();
    BodyKeyMaps.bodyHandler(hitBox);
    Body.setVelocity(hitBox.body, Vector.create(5, 0));
    return hitBox;
  }

  public static withCharacter(character: Character) {
    const hitBox = HitBox.withKeyBoardInput();
    let pos = hitBox.body.position;
    character.setPosition(pos);
    return hitBox;
  }

  public inputCoolDownSwitch(body: HitBox) {
    const id = window.setTimeout(() => {
      this.didRight = !body.didRight;
      this.didLeft = !body.didLeft;
      this.didUp = !body.didUp;
    }, 10000);

    if (this.onFloor()) {
      clearTimeout(id);
      this.didRight = false;
      this.didLeft = false;
      this.didUp = false;
    }
  }

  public getBody() {
    return this.body;
  }

  public initBody() {
    const box = Bodies.circle(10, 10, 25, {
      render: {
        fillStyle: randomColor(),
        opacity: 0.5,
      },
      friction: 1,
      label: "hitBox",
    });
    Body.setSpeed(box, 10);
    return box;
  }

  // detect if the body is on the floor
  public onFloor() {
    const ground = Composite.allBodies(PhysicEnv.World).find(
      (body) => body.label === "ground",
    )!;
    const detector = Detector.create({
      bodies: [this.body, ground, base],
    });

    const bodies = Detector.collisions(detector);

    return bodies.length > 0 ? true : false;
  }

  public moveXDirection(newV: Vector, direction: number) {
    const downV = Vector.create(3 * direction, 0);
    newV = Vector.add(newV, downV);
    return newV;
  }

  public moveDown(newV: Vector) {
    const downV = Vector.create(0, 3);
    newV = Vector.add(newV, downV);
    return newV;
  }

  public moveUp(newV: Vector) {
    const upV = Vector.create(0, -11);
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
}
