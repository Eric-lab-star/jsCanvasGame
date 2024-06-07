import Captain from "../character/Capatain";
import Level from "../levels/level";
import { getURL } from "../utilz/getUrl";
import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import {
  dummie,
  ground,
  leftWall,
  rightWall,
  topWall,
} from "../utilz/matterComponents";
import PhysicEnv from "../env/MatterEnv";

export default class Game {
  private map: Level;
  private captain: Captain;
  public canvasEnv: CanvasEnv;
  public physicEnv: PhysicEnv;

  public constructor() {
    this.map = new Level(getURL("../res/basic.json"));
    this.captain = new Captain();
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.physicEnv = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public run() {
    this.physicEnv.run();
  }

  public render() {}

  public start() {
    this.physicEnv.addComponent(
      topWall,
      ground,
      leftWall,
      rightWall,
      topWall,
      dummie,
    );
    this.run();
  }
}
