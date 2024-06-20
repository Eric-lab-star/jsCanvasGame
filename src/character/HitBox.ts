import { Body, Vector } from "matter-js";

export default abstract class HitBox {
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

  protected abstract initBody(): Body;

  // detect if the body is on the floor
  public abstract onFloor(): boolean;

  public abstract moveXDirection(newV: Vector, direction: number): Vector;

  public abstract moveDown(newV: Vector): Vector;

  public abstract moveUp(newV: Vector): Vector;

  public abstract setRight(value: boolean): void;
  public abstract setLeft(value: boolean): void;
  public abstract setUp(value: boolean): void;
  public abstract setDown(value: boolean): void;

  public abstract setAttack(value: string): void;
}
