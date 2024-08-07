import { Bodies, Body, Composite, Detector, Vector } from "matter-js";
import Character from "./Character";
import { getWorldEelement } from "../utilz/matterComponents";
import PhysicEnv from "../env/PhysicEnv";
import HitBox from "./HitBox";
import HitBoxEvent from "../Events/HitBoxEvents";

export class EnemyHitBox extends HitBox {
  private onFloorDetector: Detector;
  public body: Body;
  private pos: { x: number; y: number };
  public health: number = 100;
  public character: Character | undefined;
  public movingId: number | undefined;
  public hitBoxEvent: HitBoxEvent;

  constructor(pos: { x: number; y: number }) {
    super();
    this.pos = pos;
    this.body = this.initBody();
    this.onFloorDetector = Detector.create({
      bodies: [this.body, ...getWorldEelement()],
    });

    this.hitBoxEvent = new HitBoxEvent("hitBoxEvent");
  }

  private initBody() {
    const hitxBox = Bodies.rectangle(this.pos.x, this.pos.y, 40, 45, {
      render: {
        fillStyle: "transparent",
        opacity: 1,
      },
      friction: 0.3,
      label: "enemyHitBox",
    });
    Body.setInertia(hitxBox, Infinity);
    Body.setSpeed(hitxBox, 1);
    return hitxBox;
  }

  public static withNPC(
    character: Character,
    initpos: { x: number; y: number },
  ) {
    const hitBox = new EnemyHitBox(initpos);
    Composite.add(PhysicEnv.World, [hitBox.body]);
    hitBox.character = character;
    character.updateAnimation(hitBox.body);
    return hitBox;
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

  public setAttack() {
    //TODO: add Event
  }

  public setDeaDHit() {
    //TODO: add Event
    if (this.movingId) {
      cancelAnimationFrame(this.movingId);
    }
    Composite.remove(PhysicEnv.World, this.body);
    return;
  }

  public setHit() {
    this.health -= 10;
    //TODO: add Event
  }

  public stop() {
    //TODO: add Event
  }
}
