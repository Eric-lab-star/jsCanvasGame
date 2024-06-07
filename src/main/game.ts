import Captain from "../character/Capatain";
import Level from "../levels/level";
import { getURL } from "../utilz/getUrl";

export default class Game {
  private map: Level;
  private captain: Captain;
  public constructor() {
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
        this.renderAll();
      };
    };
  }

  public renderAll() {
    this.map.render();
    // this.captain.render();
  }

  public start() {
    this.preload();
    this.render();
  }
}
