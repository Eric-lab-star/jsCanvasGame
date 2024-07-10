import GameEnv from "../env/GameEnv";
import CanvasEnv from "../env/CanvasEnv";
import GameOver from "../UI/gameOver";
import Matter, { Events } from "matter-js";
import PhysicEnv from "../env/PhysicEnv";
import HitBoxEvent from "../Events/HitBoxEvents";

export default class PlayableCharacter {
  protected spriteImageSrc: string;
  private workerChan: MessageChannel;
  protected label: string;
  public worker: Worker;
  private canvasEnv: CanvasEnv | undefined;

  constructor(imgsrc: string, label: string) {
    this.workerChan = new MessageChannel();
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

  public updateAnimation(
    body: Matter.Body,
  ) {
    let type: string = "";

    addEventListener("hitBoxEvent", (e: HitBoxEvent) => {
      type = e.message;
      console.log(e.message);
    });

    Events.on(PhysicEnv.Runner, "afterUpdate", () => {
      let pos = body.position;
      this.workerChan.port1.postMessage({ pos, type });
    });
  }

  public gameOver() {
    const gameOver = new GameOver();

    this.workerChan.port1.onmessage = (e) => {
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
    this.workerChan.port1.onmessage = (e) => {
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
          animationPort: this.workerChan.port2,
        },
        [offscreen, spriteImage, this.workerChan.port2],
      );
    });
  }
}
