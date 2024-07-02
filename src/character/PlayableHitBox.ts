import { Body, Composite, Detector, Events, Vector } from "matter-js";
import BodyKeyMaps from "../inputs/BodyKeyMaps";
import { randomInt } from "../utilz/helper";
import Character from "./Character";
import {
  floatingPlatform3,
  getWorldEelement,
  playerHitBox,
} from "../utilz/matterComponents";
import PhysicEnv from "../env/PhysicEnv";
import HitBox from "./HitBox";
import Sword from "../sword/sword";
import BlueDiamond from "../gems/BlueDiamond";
import { EnemyHitBox } from "./EnemyHitBox";
//
//
//
export default class PlayableHitBox extends HitBox {
  private platform3Detector: Detector;
  private onFloorDetector: Detector;
  public enemyDetector: Detector;
  private hitDiamondDetector: Detector;
  public singnal: MessageChannel;
  public sword: Sword | undefined;
  public body: Body;
  private enemies: EnemyHitBox[] = [];
  private xDirection: number = 1;
  private hurtEvent: Event;
  private hurtID: number | undefined;
  private hurtReset: number | undefined;
  constructor() {
    super();
    this.body = this.initBody();
    this.singnal = new MessageChannel();
    this.platform3Detector = Detector.create({
      bodies: [this.body, floatingPlatform3],
    });
    this.onFloorDetector = Detector.create({
      bodies: [this.body, ...getWorldEelement()],
    });
    this.hitDiamondDetector = Detector.create({
      bodies: [this.body],
    });
    this.enemyDetector = Detector.create({
      bodies: [this.body],
    });
    this.hurtOnEnemy();
    this.hurtEvent = new Event("hurt", { bubbles: true, cancelable: true });
  }

  protected initBody() {
    const hitxBox = playerHitBox();
    Body.setInertia(hitxBox, Infinity);
    Body.setSpeed(hitxBox, 1);
    return hitxBox;
  }

  public static withKeyBoardInput() {
    const hitBox = new PlayableHitBox();
    BodyKeyMaps.bodyHandler(hitBox);
    return hitBox;
  }

  public static withCharacter(character: Character) {
    const hitBox = PlayableHitBox.withKeyBoardInput();
    hitBox.platform3Hit();
    hitBox.hitDiamond();
    Composite.add(PhysicEnv.World, [hitBox.body]);
    character.updateAnimation(hitBox.body, hitBox.singnal.port2);
    hitBox.deadEventListener();
    return hitBox;
  }

  public inputCoolDownSwitch() {
    const id = window.setTimeout(() => {
      this.didRight = !this.didRight;
      this.didLeft = !this.didLeft;
      this.didUp = !this.didUp;
    }, 10000);

    if (this.onFloor()) {
      clearTimeout(id);
      this.didRight = false;
      this.didLeft = false;
      this.didUp = false;
    }
  }

  public platform3Hit() {
    Events.on(PhysicEnv.Engine, "collisionStart", async () => {
      const collision = Detector.collisions(this.platform3Detector);
      if (collision.length > 0) {
        const pos = floatingPlatform3.position;
        if (BlueDiamond.onScreenDiamonds.length < 6) {
          const blueDiamond = new BlueDiamond(pos, 0, 40);
          blueDiamond.spawn();
          BlueDiamond.onScreenDiamonds.push(blueDiamond);
          const bodies = BlueDiamond.onScreenDiamonds.map(
            (diamond) => diamond.hitBox.body,
          );
          Detector.setBodies(this.hitDiamondDetector, [this.body, ...bodies]);
          const rand = randomInt(5, -5);
          Body.setVelocity(blueDiamond.hitBox.body, { x: rand, y: -5 });
        }
      }
    });
  }

  public hitDiamond() {
    Events.on(PhysicEnv.Engine, "collisionActive", () => {
      const collisions = Detector.collisions(this.hitDiamondDetector);
      collisions.forEach((col) => {
        if (col.bodyA.label === "hitBox" && col.bodyB.label === "blueDiamond") {
          BlueDiamond.onScreenDiamonds.forEach((diamond) => {
            if (diamond.hitBox.body === col.bodyB) {
              diamond.hitBox.stopUpdatePosition();
              BlueDiamond.collectedDiamonds++;
              diamond.emitEvent();
            }
          });
          BlueDiamond.onScreenDiamonds = BlueDiamond.onScreenDiamonds.filter(
            (diamond) => diamond.hitBox.body !== col.bodyB,
          );
          Composite.remove(PhysicEnv.World, col.bodyB);
        }
      });
    });
  }

  public hurtOnEnemy() {
    let didhurt = false;
    if (didhurt) return;
    const collisions = Detector.collisions(this.enemyDetector);
    collisions.forEach((col) => {
      if (
        (col.bodyA.label === "hitBox" || col.bodyB.label === "hitBox") &&
        (col.bodyA.label === "enemyHitBox" ||
          col.bodyB.label === "enemyHitBox")
      ) {
        Body.setVelocity(this.body, {
          x: (this.body.speed + 10) * this.xDirection * -1,
          y: -4,
        });

        this.setHurt();
        dispatchEvent(this.hurtEvent);
      }
    });
    this.hurtID = requestAnimationFrame(() => this.hurtOnEnemy());
  }

  public addEnemy(...enemy: EnemyHitBox[]) {
    const enemyBodies = enemy.map((e) => e.body);
    this.enemies.push(...enemy);
    this.enemyDetector.bodies.push(...enemyBodies);
  }

  public removeEnemyDetection(enemy: EnemyHitBox) {
    const index = this.enemies.indexOf(enemy);
    this.enemies.splice(index, 1);
    const enemyBody = enemy.body;
    const enemyIndex = this.enemyDetector.bodies.indexOf(enemyBody);
    this.enemyDetector.bodies.splice(enemyIndex, 1);
  }

  public getEnemies() {
    return this.enemies;
  }

  public initSword() {
    Sword.init(this);
  }

  // detect if the body is on the floor
  // TODO:
  public onFloor() {
    const collisions = Detector.collisions(this.onFloorDetector);
    return collisions.length > 0 ? true : false;
  }

  public moveXDirection(newV: Vector, direction: number) {
    this.xDirection = direction;
    const downV = Vector.create(2 * direction, 0);
    newV = Vector.add(newV, downV);
    return newV;
  }

  public moveDown(newV: Vector) {
    const downV = Vector.create(0, 3);
    newV = Vector.add(newV, downV);
    return newV;
  }

  public moveUp(newV: Vector) {
    const upV = Vector.create(0, -7);
    newV = Vector.add(newV, upV);
    return newV;
  }

  public setRight(value: boolean) {
    this.right = value;
  }

  public setLeft(value: boolean) {
    this.left = value;
  }

  public setUp(value: boolean) {
    this.up = value;
  }
  public setDown(value: boolean) {
    this.down = value;
  }

  public setHurt() {
    clearTimeout(this.hurtReset);
    this.singnal.port1.postMessage({ type: "hurt" });
    this.hurtReset = window.setTimeout(() => {
      this.singnal.port1.postMessage({ type: "" });
    }, 400);
  }

  public setAttack() {
    this.singnal.port1.postMessage({ type: "attack" });
  }

  public stop() {
    this.singnal.port1.postMessage({ type: "stop" });
  }

  public deadEventListener() {
    addEventListener("dead", () => {
      Detector.clear(this.enemyDetector);
      if (this.hurtID) {
        cancelAnimationFrame(this.hurtID);
        this.singnal.port1.postMessage({ type: "deadHit" });
        Composite.remove(PhysicEnv.World, this.body);
      }
    });
  }
}
