import { Bodies, Body, Composite } from "matter-js";
import StaticEntity from "../staticEntity/staticEntity";
import PhysicEnv from "../env/PhysicEnv";

export default class StaticHitBox {
  private width: number;
  private height: number;
  private pos: { x: number; y: number };
  public body: Body;
  public label: string;
  private updateId: number | undefined;
  private entity: StaticEntity | undefined;

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

  public updateEntityPos(entity: StaticEntity) {
    entity.channel.port1.postMessage(this.body.position);
    this.entity = entity;
    this.updateId = requestAnimationFrame(() => this.updateEntityPos(entity));
  }

  public stopUpdatePosition() {
    if (this.updateId) {
      cancelAnimationFrame(this.updateId);
      this.entity?.stopRender();
    }
  }
}
