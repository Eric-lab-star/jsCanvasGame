import { Body } from "matter-js";
import {
  base,
  dummie,
  ground,
  leftWall,
  rightWall,
  topWall,
} from "../utilz/matterComponents";
import PhysicEnv from "../env/MatterEnv";
import GameEnv from "../env/GameEnv";

export default class MatterTest {
  private physic: PhysicEnv;
  public constructor() {
    this.physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public run() {
    this.physic.run();
  }

  private initGameScene() {
    this.physic.addComponent(
      base,
      ground,
      leftWall,
      rightWall,
      topWall,
      dummie,
    );
  }

  private update() {
    Body.setVelocity(dummie, { x: 10, y: 0 });
    Body.setSpeed(dummie, 20);
  }

  public start() {
    this.initGameScene();
    this.update();
    this.run();
  }
}
