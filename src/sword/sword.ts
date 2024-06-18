import {
  Bodies,
  Body,
  Composite,
  Constraint,
  Detector,
  Events,
} from "matter-js";
import { randomColor } from "../utilz/helper";
import PhysicEnv from "../env/PhysicEnv";
import { HitBox } from "../character/HitBox";
import { enemy } from "../utilz/matterComponents";

export default class Sword {
  public swingBody: Body;
  private width: number = 50;
  private swingHit: boolean = false;

  constructor(
    hitBox: HitBox,
    collisionGroup: number,
    pos: { x: number; y: number },
  ) {
    this.swingBody = this.initSwingBody(collisionGroup, pos, hitBox);
    this.didHit();
  }

  private initSwingBody(
    collisionGroup: number,
    pos: { x: number; y: number },
    hitBox: HitBox,
  ) {
    const swingBody = Bodies.rectangle(pos.x + this.width / 2, pos.y, 60, 10, {
      render: {
        fillStyle: randomColor(),
      },
      isSensor: true,
      label: "swingSword",
      collisionFilter: {
        group: collisionGroup,
      },
      chamfer: { radius: 5 },
    });

    const constraint = Constraint.create({
      bodyA: swingBody,
      bodyB: hitBox.body,
      length: 0,
    });
    Composite.add(PhysicEnv.World, [swingBody, constraint]);
    Body.setCentre(swingBody, { x: -this.width / 2, y: 0 }, true);
    Body.setAngle(swingBody, -Math.PI / 2);
    return swingBody;
  }

  private didHit() {
    Detector.create({
      bodies: [this.swingBody, enemy],
    });

    Events.on(PhysicEnv.Engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      for (const pair of pairs) {
        if (
          (pair.bodyA === this.swingBody || pair.bodyB === this.swingBody) &&
          (pair.bodyA === enemy || pair.bodyB === enemy)
        ) {
          this.swingHit = true;
          window.setTimeout(() => {
            this.swingHit = false;
          }, 100);
          console.log(pair);
        }
      }
    });
  }

  public swing(swingDirection: number = 1) {
    if (this.swingHit) {
      Body.setVelocity(enemy, { x: 4 * swingDirection, y: -4 });
      this.swingHit = false;
    }
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
