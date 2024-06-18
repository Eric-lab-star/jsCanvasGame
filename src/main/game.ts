import Captain from "../character/Capatain";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { HitBox } from "../character/HitBox";
import { Composite } from "matter-js";
import {
  enemy,
  flag,
  shipHelm,
  treasureBox,
  getWorldEelement,
} from "../utilz/matterComponents";
import World from "../levels/world";

export default class Game {
  private captain: Captain;
  private physic?: PhysicEnv;
  private gameWorld: World;

  public constructor() {
    this.gameWorld = new World();
    this.captain = new Captain();
  }

  private async preload() {
    await World.assetPreloader();
  }

  private run() {
    HitBox.withCharacter(this.captain);
    Composite.add(PhysicEnv.World, [
      flag.body,
      shipHelm.body,
      treasureBox.body,
      enemy,
      ...getWorldEelement(),
    ]);
  }

  private render() {
    this.gameWorld.render();
    this.physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.physic.run();
    this.captain.renderOffscreen();
  }

  public async start() {
    await this.preload();
    this.render();
    this.run();
  }
}
