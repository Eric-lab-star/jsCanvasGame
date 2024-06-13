import Captain from "../character/Capatain";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { HitBox } from "../character/HitBox";
import { Composite } from "matter-js";
import { getWorldEelement } from "../utilz/matterComponents";
import World from "../levels/world";

export default class Game {
  private captain: Captain;
  private catptainHitBox: HitBox;
  private physicEnv: PhysicEnv;
  private gameWorld: World;

  public constructor() {
    this.physicEnv = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.gameWorld = new World();
    this.captain = new Captain();
    this.catptainHitBox = HitBox.withCharacter(this.captain);
  }

  private async preload() {
    await World.assetPreloader();
  }

  private run() {
    Composite.add(PhysicEnv.World, [
      this.catptainHitBox.body,
      ...getWorldEelement(),
    ]);
    this.physicEnv.run();
  }

  private render() {
    this.gameWorld.render();
    this.captain.renderOffscreen();
  }

  public async start() {
    await this.preload();
    this.run();
    this.render();
  }
}
