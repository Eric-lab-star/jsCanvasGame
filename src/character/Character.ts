import GameEnv from "../env/GameEnv";
import CanvasEnv from "../env/CanvasEnv";

/**
 * @class Character
 * @description this class is updating position of ther character and initializing the worker.
 * */
export default class Character {
  protected spriteImageSrc: string;
  private messageChannel: MessageChannel;
  protected label: string;

  constructor(imgsrc: string, label: string) {
    this.messageChannel = new MessageChannel();
    this.spriteImageSrc = imgsrc;
    this.label = label;
  }

  private attack: string = "";

  public updateAnimation(
    pos: { x: number; y: number },
    attackSignalReceiver: MessagePort,
  ) {
    attackSignalReceiver.onmessage = (e: MessageEvent<{ attack: string }>) => {
      this.attack = e.data.attack;
    };

    this.messageChannel.port1.postMessage({ pos, attack: this.attack });
    requestAnimationFrame(() =>
      this.updateAnimation(pos, attackSignalReceiver),
    );
  }

  /**
   * @method renderOffscreen
   * @description This method sends data to the worker to render the character offscreen.
   * */
  public renderOffscreen() {
    const worker = new Worker(
      new URL("../workers/characterWorker.ts", import.meta.url),
      {
        type: "module",
      },
    );

    const characterCanvas = new CanvasEnv(
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
    );

    const offscreen = characterCanvas.canvas.transferControlToOffscreen();
    const img = new Image();
    img.src = this.spriteImageSrc;

    img.addEventListener("load", async () => {
      const spriteImage = await createImageBitmap(img);
      worker.postMessage(
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
