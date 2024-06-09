import { Composite } from "matter-js";
import Captain from "../character/Capatain";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { getWorldEelement } from "../utilz/matterComponents";
import { JsonTypes } from "../workers/levelConsumer";

export default class MatterTest {
  private physic: PhysicEnv;
  private captain: Captain;
  public constructor() {
    this.captain = new Captain();
    this.physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public run() {
    Composite.add(this.physic.World, [...getWorldEelement()]);
    this.physic.run();
    this.captain.render();
  }
}
