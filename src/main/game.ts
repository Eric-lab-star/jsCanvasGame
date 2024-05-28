import GameEnv from "../env/GameEnv";
import Level from "../levels/level";

export default class Game extends GameEnv {
  private map: Level;
  public constructor() {
    super();
    this.map = new Level();
  }

  public tester() {
    let i = this.runAnimationTick();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(i * 10, i * 10, 100, 100);
  }

  public ani() {
    requestAnimationFrame(() => this.ani());
    console.log("running");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tester();
  }

  public start() {
    this.map.handleMap();
    this.ani();
  }
}
