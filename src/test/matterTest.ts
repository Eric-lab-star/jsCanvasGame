import { Composite } from "matter-js";
import Captain from "../character/Capatain";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { getWorldEelement } from "../utilz/matterComponents";
import { HitBox } from "../character/HitBox";

export default class MatterTest {
  private physic: PhysicEnv;
  private captain: Captain;
  public constructor() {
    this.captain = new Captain();
    this.physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public gen() {
    const box = HitBox.withKeyBoardInput();
    Composite.add(PhysicEnv.World, box.getBody());
  }

  public run() {
    this.gen();
    Composite.add(PhysicEnv.World, [...getWorldEelement()]);
    this.physic.run();
    this.captain.render();
  }
}
