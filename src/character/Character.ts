import GameEnv from "../env/GameEnv";
import CanvasEnv from "../env/CanvasEnv";

/**
 * @class Character
 * @description this class is updating position of ther character and initializing the worker.
 * */
export default class Character {
  protected spriteImageSrc: string;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;

  private messageChannel: MessageChannel;

  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    imgsrc: string,
  ) {
    this.messageChannel = new MessageChannel();
    this.animationFrames = animationFrames;
    this.spriteImageSrc = imgsrc;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
  }

  public updatePos(pos: { x: number; y: number }) {
    this.messageChannel.port1.postMessage({ pos });
    requestAnimationFrame(() => this.updatePos(pos));
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
          offscreen: offscreen,
          spriteImage: spriteImage,
          imgWidth: this.imgWidth,
          imgHeight: this.imgHeight,
          animationFrames: this.animationFrames,
          posPort: this.messageChannel.port2,
        },
        [offscreen, spriteImage, this.messageChannel.port2],
      );
    });
  }
}
