/// img
import crabImg from "../res/world/64px/Crabby.png";
import captainImg from "../res/world/64px/captain.png";
///
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
import World from "../levels/world";
import Character from "../character/Character";

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
    const captain = new Character(captainImg, "captain");
    HitBox.withCharacter(captain);
    captain.renderOffscreen();

    const crab = new Character(crabImg, "craby");
    HitBox.withNPC(crab);
    crab.renderOffscreen();

    // const shark = new Shark();
    // HitBox.withNPC(shark);
    // shark.renderOffscreen();
  }

  public run() {
    this.gen();
  }
}
