import { Body } from "matter-js";
import Character from "./Character";
import { EnemyHitBox } from "./EnemyHitBox";

export default class CrabyHitBox {
  public hitBox: EnemyHitBox;

  constructor(character: Character, initpos: { x: number; y: number }) {
    this.hitBox = EnemyHitBox.withNPC(character, initpos);
  }

  private movingDirection = 1;
  private start: number | undefined;
  public moveCrab(time: number = 0) {
    if (this.start === undefined) {
      this.start = time;
    }

    const elapsed = time - this.start;

    if (this.hitBox.onFloor()) {
      Body.setVelocity(this.hitBox.body, {
        x: this.movingDirection,
        y: 0,
      });
    }

    if (this.hitBox.body.position.x <= 500) {
      this.movingDirection = this.movingDirection * -1;
      Body.setVelocity(this.hitBox.body, { x: this.movingDirection, y: 0 });
    }
    if (this.hitBox.body.position.x >= 1000) {
      this.movingDirection = this.movingDirection * -1;
      Body.setVelocity(this.hitBox.body, { x: this.movingDirection, y: 0 });
    }

    if (elapsed > 5000) {
      this.start += 5000;
      Body.setVelocity(this.hitBox.body, { x: 0, y: -7 });
    }

    this.hitBox.movingId = requestAnimationFrame((time: number) =>
      this.moveCrab(time)
    );
  }
}
