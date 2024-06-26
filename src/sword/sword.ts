import { Body, Composite, Constraint, Detector, Events } from "matter-js";
import PhysicEnv from "../env/PhysicEnv";
import { swingSword } from "../utilz/matterComponents";
import { PlayableHitBox } from "../character/PlayableHitBox";
import { EnemyHitBox } from "../character/EnemyHitBox";

export default class Sword {
  public swingBody: Body;
  private width: number = 50;
  private detector: Detector;
  private enmeies: EnemyHitBox[] = [];
  private swingDirection: number = 1;
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

  public addEnemy(...enemy: EnemyHitBox[]) {
    const enemyBodies = enemy.map((e) => e.body);
    this.enmeies.push(...enemy);
    this.detector.bodies.push(...enemyBodies);
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
    let id: number;
    let hitCounter: number;
    Events.on(PhysicEnv.Engine, "collisionStart", (event) => {
      const collisions = Detector.collisions(this.detector);
      collisions.forEach((collision) => {
        if (
          collision.bodyA.label === "swingSword" ||
          collision.bodyB.label === "swingSword"
        ) {
          const enemyBody =
            collision.bodyA.label === "swingSword"
              ? collision.bodyB
              : collision.bodyA;
          if (hitCounter >= 5) {
            Body.setVelocity(enemyBody, { x: 0, y: 0 });
          }
          Body.setVelocity(enemyBody, { x: 1 * this.swingDirection, y: -3 });
          hitCounter++;
          if (id) {
            clearTimeout(id);
          }
          this.enmeies.forEach((e) => {
            if (e.body === enemyBody) {
              e.setHit();
              id = window.setTimeout(() => {
                e.stop();
              }, 500);
            }
          });
        }
      });
    });
  }

  public swing(swingDirection: number = 1) {
    this.swingDirection = swingDirection;
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
