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

  public preload() {
    this.map.resolveImages();
    this.captain.setAnimation();
  }

  public render() {
    this.map.messageChan.port2.onmessage = () => {
      this.captain.messageChan.port2.onmessage = () => {
        this.centerText("click to start", 0, 40);
        addEventListener("click", () => {
          this.handleClick();
        });
      };
    };
  }

  public handleClick() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.render();
    this.captain.render();
  }

  public start() {
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.centerText("Adventure Game");
  }

  public centerText(title: string, offsetW: number = 0, offsetH: number = 0) {
    const offcanvas = document.createElement("canvas");
    offcanvas.width = this.getGameWidth();
    offcanvas.height = this.getGameHeight();
    const ctx = offcanvas.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.font = "40px Fantasy";
    const titleLen = ctx.measureText(title);
    ctx.fillText(
      title,
      (this.getGameWidth() - titleLen.width) / 2 + offsetW,
      this.getGameHeight() / 2 + offsetH,
    );

    this.ctx.drawImage(offcanvas, 0, 0);
  }
}
