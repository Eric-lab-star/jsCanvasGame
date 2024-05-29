import Captain from "../character/Capatain";
import GameEnv from "../env/GameEnv";
import Level from "../levels/level";
import { getURL } from "../utilz/getUrl";

export default class Game extends GameEnv {
  private map: Level;
  private captain: Captain;
  public constructor() {
    super();
    this.map = new Level(getURL("../res/basic.json"));
    this.captain = new Captain();
  }

  public tester() {
    let i = this.runAnimationTick();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(i * 10, i * 10, 100, 100);
  }

  public ani() {
    requestAnimationFrame(() => this.ani());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tester();
  }

  public preload() {
    this.map.resolveImages();
    this.captain.setAnimation();
  }

  public start() {
    this.map.render();
    this.captain.render();
    // this.ani();
  }
}
