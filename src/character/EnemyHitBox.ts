import { Body, Composite, Detector, Vector } from "matter-js";
import Character from "./Character";

import { getWorldEelement, playerHitBox } from "../utilz/matterComponents";
import PhysicEnv from "../env/PhysicEnv";
import HitBox from "./HitBox";

export class EnemyHitBox extends HitBox {
  private onFloorDetector: Detector;
  public attackSignal: MessageChannel;
  constructor() {
    super();
    this.onFloorDetector = Detector.create({
      bodies: [this.body, ...getWorldEelement()],
    });
    this.attackSignal = new MessageChannel();
  }

  protected initBody() {
    const hitxBox = playerHitBox();
    Body.setInertia(hitxBox, Infinity);
    Body.setSpeed(hitxBox, 1);
    return hitxBox;
  }

  public static withNPC(character: Character) {
    const hitBox = new EnemyHitBox();
    const pos = hitBox.body.position;
    Composite.add(PhysicEnv.World, [hitBox.body]);
    character.updateAnimation(pos, hitBox.attackSignal.port2);
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
}
