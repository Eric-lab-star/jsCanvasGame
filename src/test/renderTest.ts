import Captain from "../character/Capatain";
import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
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

  public center() {
    const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const ctx = canvas.canvas.getContext("2d");
    ctx?.fillRect(GameEnv.GAME_WIDTH / 2, GameEnv.GAME_HEIGHT / 2, 4, 4);
  }

  // level specific test worker
  public start() {
    addEventListener("keydown", (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "r") {
        window.location.reload();
      }
    });
    this.map.render();
    this.captain.render();
    this.center();
  }
}
