import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";

export default class MatterTest {
  private physic: PhysicEnv;
  public constructor() {
    this.physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public run() {
    this.physic.run();
  }

  public start() {}
}
