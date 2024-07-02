import GameEnv from "../env/GameEnv";
import CanvasEnv from "../env/CanvasEnv";
import GameOver from "../UI/gameOver";
import Matter, { Events } from "matter-js";
import PhysicEnv from "../env/PhysicEnv";

/**
 * @class Character
 * @description this class is updating position of ther character and initializing the worker.
 */
export default class Character {
  protected spriteImageSrc: string;
  private messageChannel: MessageChannel;
  protected label: string;
  public worker: Worker;
  private canvasEnv: CanvasEnv | undefined;

  constructor(imgsrc: string, label: string) {
    this.messageChannel = new MessageChannel();
    this.spriteImageSrc = imgsrc;
    this.label = label;
    this.worker = new Worker(
      new URL("../workers/characterWorker.ts", import.meta.url),
      {
        type: "module",
      },
    );
    this.dead();
    this.gameOver();
  }

  private signalType: string = "";

  public updateAnimation(
    body: Matter.Body,
    singnalReceiver: MessagePort,
  ) {
    singnalReceiver.onmessage = (e: MessageEvent<{ type: string }>) => {
      this.signalType = e.data.type;
    };

    Events.on(PhysicEnv.Runner, "afterUpdate", () => {
      let pos = body.position;
      this.messageChannel.port1.postMessage({ pos, type: this.signalType });
    });
  }

  public gameOver() {
    const gameOver = new GameOver();
    this.messageChannel.port1.onmessage = (e) => {
      if (e.data.type === "gameOver") {
        if (this.canvasEnv) {
          this.stopRender();
          document.body.removeChild(this.canvasEnv.canvas);
          gameOver.event();
        }
      }
    };
  }

  public terminate() {
    if (this.canvasEnv) {
      this.stopRender();
      document.body.removeChild(this.canvasEnv.canvas);
    }
  }

  private dead() {
    this.messageChannel.port1.onmessage = (e) => {
      if (e.data.type === "deadHit") {
        if (this.canvasEnv) {
          this.stopRender();
          document.body.removeChild(this.canvasEnv.canvas);
        }
      }
    };
  }

  private stopRender() {
    if (this.canvasEnv != undefined) {
      setTimeout(() => {
        this.worker.terminate();
      }, 1000);
    }
  }

  /**
   * @method renderOffscreen
   * @description This method sends data to the worker to render the character offscreen.
   */
  public renderOffscreen() {
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const offscreen = this.canvasEnv.canvas.transferControlToOffscreen();
    const img = new Image();
    img.src = this.spriteImageSrc;

    img.addEventListener("load", async () => {
      const spriteImage = await createImageBitmap(img);
      this.worker.postMessage(
        {
          label: this.label,
          offscreen: offscreen,
          spriteImage: spriteImage,
          animationPort: this.messageChannel.port2,
        },
        [offscreen, spriteImage, this.messageChannel.port2],
      );
    });
  }
}
