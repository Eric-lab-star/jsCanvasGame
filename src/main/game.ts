import Captain from "../character/Capatain";
import Level from "../levels/level";
import levelJson from "../res/basic.json";
import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { JsonTypes } from "../workers/levelConsumer";

export default class Game {
  private map: Level;
  private captain: Captain;
  public canvasEnv: CanvasEnv;
  public physicEnv: PhysicEnv;

  public constructor() {
    this.map = new Level(levelJson as JsonTypes);
    this.captain = new Captain();
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.physicEnv = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public run() {
    this.physicEnv.run();
  }

  public render() {
    this.map.render();
    this.captain.render();
  }

  public start() {
    this.render();
  }
}
