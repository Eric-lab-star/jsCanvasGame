import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
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
  private physic?: PhysicEnv;
  private gameWorld: World;

  public constructor() {
    this.gameWorld = new World();
  }

  private async preload() {
    await World.assetPreloader();
  }

  private run() {
    Composite.add(PhysicEnv.World, [
      flag.body,
      shipHelm.body,
      treasureBox.body,
      enemy,
      ...getWorldEelement(),
    ]);
  }

  private render() {
    this.gameWorld.renderImages();
    this.physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.physic.run();
  }

  public async start() {
    await this.preload();
    this.render();
    this.run();
  }
}
