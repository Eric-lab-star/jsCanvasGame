import GameEnv from "../env/GameEnv";
import CanvasEnv from "../env/CanvasEnv";

/**
 * @class Character
 * @description this class is updating position of ther character and initializing the worker.
 */
export default class Character {
  protected spriteImageSrc: string;
  private messageChannel: MessageChannel;
  protected label: string;
  public worker: Worker;
  public animationId: number | undefined;
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
    this.deadHit();
  }

  private signalType: string = "";

  public updateAnimation(
    pos: { x: number; y: number },
    singnalReceiver: MessagePort,
  ) {
    singnalReceiver.onmessage = (e: MessageEvent<{ type: string }>) => {
      this.signalType = e.data.type;
    };

    this.messageChannel.port1.postMessage({ pos, type: this.signalType });
    this.animationId = requestAnimationFrame(() =>
      this.updateAnimation(pos, singnalReceiver)
    );
  }

  private deadHit() {
    this.messageChannel.port1.onmessage = (e) => {
      this.stopRender();
      if (e.data.type === "deadHit") {
        if (this.canvasEnv) {
          document.body.removeChild(this.canvasEnv.canvas);
        }
      }
    };
  }

  public stopRender() {
    if (this.animationId && this.canvasEnv) {
      cancelAnimationFrame(this.animationId);
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
