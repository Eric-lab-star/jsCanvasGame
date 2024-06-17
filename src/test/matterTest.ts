import { Composite } from "matter-js";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { HitBox } from "../character/HitBox";
import {
  flag,
  getWorldEelement,
  shipHelm,
  treasureBox,
} from "../utilz/matterComponents";
import Captain from "../character/Capatain";
import World from "../levels/world";

export default class MatterTest {
  public constructor() {}

  public async gen() {
    const world = new World();
    await World.assetPreloader();
    world.render();
    const captain = new Captain();
    const physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const hitBox = HitBox.withCharacter(captain);
    Composite.add(PhysicEnv.World, [
      hitBox.body,
      flag.body,
      shipHelm.body,
      treasureBox.body,

      ...getWorldEelement(),
    ]);
    physic.run();
    // captain.renderOffscreen();
  }

  public run() {
    this.gen();
  }
}
