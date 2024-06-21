import { Bodies, Body, Composite } from "matter-js";
import StaticEntity from "../staticEntity/staticEntity";
import PhysicEnv from "../env/PhysicEnv";

export default class StaticHitBox {
  private width: number;
  private height: number;
  private pos: { x: number; y: number };
  public body: Body;
  public label: string;

  constructor(
    label: string,
    width: number,
    height: number,
    pos: { x: number; y: number },
  ) {
    this.label = label;
    this.width = width;
    this.height = height;
    this.pos = pos;
    this.body = this.initBody();
  }

  private initBody() {
    const body = Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      {
        label: this.label,
      },
    );
    Composite.add(PhysicEnv.World, [body]);
    return body;
  }

  public withEntity(entity: StaticEntity) {
    this.positionUpdate(entity);
  }

  public positionUpdate(entity: StaticEntity) {
    entity.channel.port1.postMessage(this.body.position);
    requestAnimationFrame(() => this.positionUpdate(entity));
  }
}
