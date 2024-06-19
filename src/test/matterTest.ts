import { Composite } from "matter-js";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { HitBox } from "../character/HitBox";
import {
  enemy,
  flag,
  getWorldEelement,
  shipHelm,
  treasureBox,
} from "../utilz/matterComponents";
import Captain from "../character/Capatain";
import World from "../levels/world";
import Shark from "../character/Shark";

export default class MatterTest {
  public constructor() {}

  public async gen() {
    const world = new World();
    await World.assetPreloader();
    world.render();
    const physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);

    Composite.add(PhysicEnv.World, [
      flag.body,
      shipHelm.body,
      treasureBox.body,
      enemy,
      ...getWorldEelement(),
    ]);
    physic.run();
    this.spawnCharacter();
  }

  private spawnCharacter() {
    // const captain = new Captain();
    // HitBox.withCharacter(captain);
    // captain.renderOffscreen();

    const shark = new Shark();
    HitBox.withCharacter(shark);
    shark.renderOffscreen();
  }

  public run() {
    this.gen();
  }
}
