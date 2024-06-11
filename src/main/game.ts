import Captain from "../character/Capatain";
import Level from "../levels/level";
import levelJson from "../res/basic.json";
import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { JsonTypes } from "../workers/levelConsumer";
import { HitBox } from "../character/HitBox";
import { Composite } from "matter-js";
import { base, getWorldEelement } from "../utilz/matterComponents";

export default class Game {
  private map: Level;
  private captain: Captain;
  private catptainHitBox: HitBox;
  public canvasEnv: CanvasEnv;
  public physicEnv: PhysicEnv;

  public constructor() {
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.physicEnv = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.map = new Level(levelJson as JsonTypes);
    this.captain = new Captain();
    this.catptainHitBox = HitBox.withCharacter(this.captain);
  }

  public run() {
    Composite.add(PhysicEnv.World, [
      this.catptainHitBox.body,
      ...getWorldEelement(),
    ]);
    this.physicEnv.run();
  }

  public render() {
    this.map.render();
    this.captain.render();
  }

  public start() {
    this.run();
    this.render();
  }
}
