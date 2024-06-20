/// img
import crabImg from "../res/world/64px/Crabby.png";
import captainImg from "../res/world/64px/captain.png";
import sharkImg from "../res/world/64px/shark.png";
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
import { PlayableHitBox } from "../character/PlayableHitBox";
import { EnemyHitBox } from "../character/EnemyHitBox";

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

  private spawnCaptain() {
    const captain = new Character(captainImg, "captain");
    PlayableHitBox.withCharacter(captain);
    captain.renderOffscreen();
  }

  private spawnCrab() {
    const crab = new Character(crabImg, "craby");
    EnemyHitBox.withNPC(crab);
    crab.renderOffscreen();
  }

  private spawnShark() {
    const shark = new Character(sharkImg, "shark");
    EnemyHitBox.withNPC(shark);
    shark.renderOffscreen();
  }

  private spawnCharacter() {
    this.spawnCrab();
    this.spawnShark();
    this.spawnCaptain();
  }

  public run() {
    this.gen();
  }
}
