import { Body, Composite, Constraint, Detector, Events } from "matter-js";
import PhysicEnv from "../env/PhysicEnv";
import { enemy, swingSword } from "../utilz/matterComponents";
import { PlayableHitBox } from "../character/PlayableHitBox";

export default class Sword {
  public swingBody: Body;
  private width: number = 50;
  private detector: Detector;
  constructor(
    hitBox: Body,
    collisionGroup: number,
    pos: { x: number; y: number },
  ) {
    this.swingBody = this.initSwingBody(collisionGroup, pos, hitBox);
    this.detector = Detector.create({
      bodies: [this.swingBody],
    });
    this.collisionDetecor();
  }

  public static init(hitBox: PlayableHitBox) {
    const group = Body.nextGroup(true);
    const pos = hitBox.body.position;
    hitBox.body.collisionFilter.group = group;
    const sword = new Sword(hitBox.body, group, pos);
    hitBox.sword = sword;
    return sword;
  }

  public addEnemy(enemy: Body) {
    this.detector.bodies.push(enemy);
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

  private collisionDetecor() {
    const collisions = Detector.collisions(this.detector);
    collisions.forEach((collision) => {
      if (
        collision.bodyA.label === "swingSword" ||
        collision.bodyB.label === "swingSword"
      ) {
        const enemy =
          collision.bodyA.label === "swingSword"
            ? collision.bodyB
            : collision.bodyA;
        console.log(enemy);
      }
    });
    requestAnimationFrame(() => this.collisionDetecor());
  }

  public swing(swingDirection: number = 1) {
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
