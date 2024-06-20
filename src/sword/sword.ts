import { Body, Composite, Constraint, Detector, Events } from "matter-js";
import PhysicEnv from "../env/PhysicEnv";
import { enemy, swingSword } from "../utilz/matterComponents";

export default class Sword {
  public swingBody: Body;
  private width: number = 50;
  constructor(
    hitBox: Body,
    collisionGroup: number,
    pos: { x: number; y: number },
  ) {
    this.swingBody = this.initSwingBody(collisionGroup, pos, hitBox);
    Detector.create({
      bodies: [this.swingBody, enemy],
    });
  }

  private initSwingBody(
    collisionGroup: number,
    pos: { x: number; y: number },
    hitBox: Body,
  ) {
    const swingBody = swingSword(pos, collisionGroup, this.width);

    const constraint = Constraint.create({
      bodyA: swingBody,
      bodyB: hitBox,
      length: 0,
    });
    Composite.add(PhysicEnv.World, [swingBody, constraint]);
    Body.setCentre(swingBody, { x: -this.width / 2, y: 0 }, true);
    Body.setAngle(swingBody, -Math.PI / 2);
    return swingBody;
  }

  public swing(swingDirection: number = 1) {
    Events.on(PhysicEnv.Engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      for (const pair of pairs) {
        if (
          (pair.bodyA === this.swingBody || pair.bodyB === this.swingBody) &&
          (pair.bodyA === enemy || pair.bodyB === enemy)
        ) {
          Body.setVelocity(enemy, { x: 2 * swingDirection, y: -4 });
        }
      }
    });

    Body.setAngularVelocity(
      this.swingBody,
      (Math.PI / 180) * 10 * swingDirection,
    );
    if (swingDirection === 1) {
      if (this.swingBody.angle > Math.PI / 8) {
        Body.setAngle(this.swingBody, -Math.PI / 2);
      }
    }

    if (swingDirection === -1) {
      if (this.swingBody.angle < -(Math.PI + Math.PI / 8)) {
        Body.setAngle(this.swingBody, -Math.PI / 2);
      }
    }
  }

  public resetSwing() {
    Body.setAngularVelocity(this.swingBody, 0);
    Body.setAngle(this.swingBody, -Math.PI / 2);
  }
}
