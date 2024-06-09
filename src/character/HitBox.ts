import { Bodies, Body } from "matter-js";

export class HitBox {
  public box: Body;
  constructor() {
    this.box = Bodies.rectangle(0, 0, 100, 100);
  }
  public print() {
    console.log(this.box);
  }

  public static create(): Body {
    return Bodies.rectangle(0, 0, 100, 100);
  }
}
