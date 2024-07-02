import { Body, Composite, Constraint, Detector, Events } from "matter-js";
import PhysicEnv from "../env/PhysicEnv";
import { swingSword } from "../utilz/matterComponents";
import PlayableHitBox from "../character/PlayableHitBox";

export default class Sword {
  public swingBody: Body;
  private width: number = 50;
  private swordHitDetector: Detector;
  private swingDirection: number = 1;
  public killCount: number = 0;
  private killEvent: Event;
  private playableHitBox: PlayableHitBox;

  constructor(
    playableHitBox: PlayableHitBox,
    collisionGroup: number,
    pos: { x: number; y: number },
  ) {
    this.playableHitBox = playableHitBox;
    this.swingBody = this.initSwingBody(
      collisionGroup,
      pos,
      playableHitBox.body,
    );
    this.swordHitDetector = Detector.create({
      bodies: [this.swingBody, ...playableHitBox.enemyDetector.bodies],
    });
    this.collisionDetecor();
    this.killEvent = new Event("killCount", {
      bubbles: true,
      cancelable: true,
    });
    addEventListener("gameOver", () => {
      Composite.remove(PhysicEnv.World, this.swingBody);
    });
  }

  public static init(playableHitBox: PlayableHitBox) {
    const group = Body.nextGroup(true);
    const pos = playableHitBox.body.position;
    playableHitBox.body.collisionFilter.group = group;
    const sword = new Sword(playableHitBox, group, pos);
    playableHitBox.sword = sword;
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

    Events.on(PhysicEnv.Engine, "collisionStart", () => {
      const collisions = Detector.collisions(this.swordHitDetector);

      collisions.forEach((collision) => {
        if (
          collision.bodyA.label === "swingSword" ||
          collision.bodyB.label === "swingSword"
        ) {
          const enemyBody = collision.bodyA.label === "swingSword"
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

          const enemies = this.playableHitBox.getEnemies();
          enemies.forEach((enemy) => {
            if (enemy.body === enemyBody) {
              enemy.setHit();
              if (enemy.health <= 0) {
                enemy.setDeaDHit();
                this.playableHitBox.removeEnemyDetection(enemy);
                const enemyIndex = this.swordHitDetector.bodies
                  .indexOf(enemy.body);
                this.swordHitDetector.bodies.splice(enemyIndex, 1);

                dispatchEvent(this.killEvent);
              }
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
