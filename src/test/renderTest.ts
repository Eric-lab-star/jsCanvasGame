import Captain from "../character/Capatain";
import Level from "../levels/level";
import { getURL } from "../utilz/getUrl";

export default class RenderTest {
  private map: Level;
  private captain: Captain;

  public constructor() {
    this.map = new Level(getURL("../res/basic.json"));
    this.captain = new Captain();
  }
  // level specific test worker
  public start() {
    this.map.render();
    this.captain.workerProvider();
  }
}
