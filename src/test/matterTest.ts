import { Body, Render, Runner } from "matter-js";
import {
  dummie,
  ground,
  leftWall,
  rightWall,
  topWall,
} from "../utilz/matterComponents";
import PhysicEnv from "../env/physicEnv";
import GameEnv from "../env/GameEnv";

export default class MatterTest {
  private physic: PhysicEnv;
  public constructor() {
    this.physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public run() {
    Render.run(this.physic.Render);
    const runner = Runner.create();
    Runner.run(runner, this.physic.Engine);
  }

  private initGameScene() {
    this.physic.addComponent(leftWall, rightWall, ground, topWall, dummie);
  }

  private update() {
    Body.setVelocity(dummie, { x: 1, y: 0 });
    Body.setSpeed(dummie, 10);
  }

  public start() {
    this.initGameScene();
    this.update();
    this.run();
  }
}
