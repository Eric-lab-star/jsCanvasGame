import Captain from "../character/Capatain";
import Level from "../levels/level";
import levelJson from "../res/basic.json";
import { JsonTypes } from "../workers/levelConsumer";
export default class RenderTest {
  private map: Level;
  private captain: Captain;

  public constructor() {
    this.map = new Level(levelJson as JsonTypes);
    this.captain = new Captain();
  }
  // level specific test worker
  public start() {
    this.map.render();
    this.captain.render();
  }
}
