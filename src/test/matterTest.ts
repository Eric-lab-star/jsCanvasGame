import { Composite } from "matter-js";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { HitBox } from "../character/HitBox";
import { getWorldEelement } from "../utilz/matterComponents";
import Captain from "../character/Capatain";

export default class MatterTest {
  public constructor() {}

  public gen() {
    const captain = new Captain();
    const physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const hitBox = HitBox.withCharacter(captain);
    Composite.add(PhysicEnv.World, hitBox.body);
    Composite.add(PhysicEnv.World, [...getWorldEelement()]);
    physic.run();
    captain.renderOffscreen();
  }

  public run() {
    this.gen();
  }
}
