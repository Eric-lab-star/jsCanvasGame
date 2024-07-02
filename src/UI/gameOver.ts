import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";

export default class GameOver {
  private gameOverEvent: Event;
  private canvasEnv: CanvasEnv;
  constructor() {
    this.gameOverEvent = new Event("gameOver", {
      bubbles: true,
      cancelable: true,
    });
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public UI() {
    this.canvasEnv.getCtx().reset();
    this.canvasEnv.getCtx().fillStyle = "black";
    this.canvasEnv.getCtx().fillRect(
      0,
      0,
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
    );
    this.canvasEnv.getCtx().fillStyle = "white";
    this.canvasEnv.getCtx().font = "30px Arial";
    this.canvasEnv.getCtx().fillText("Game Over", 10, 50);
  }

  public event() {
    document.dispatchEvent(this.gameOverEvent);
  }
}
