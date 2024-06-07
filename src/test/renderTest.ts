import Level from "../levels/level";
import { getURL } from "../utilz/getUrl";

export default class RenderTest {
  private map: Level;
  public constructor() {
    this.map = new Level(getURL("../res/basic.json"));
  }

  /// level specific test
  public preloadLevel() {
    this.map.resolveImages();
  }

  /// level specific test
  public renderLevel() {
    this.map.messageChan.port2.onmessage = () => {
      this.map.render();
    };
  }

  public preloadAll() {
    this.map.resolveImages();
  }
  public renderAll() {
    this.map.render();
  }
}
