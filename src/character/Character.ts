import GameEnv from "../env/GameEnv";
import CanvasEnv from "../env/CanvasEnv";

export default class Character {
  protected spriteImageSrc: string;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected characterCanvas: CanvasEnv;
  protected worker: Worker;
  protected messageChannel: MessageChannel;
  protected position: { x: number; y: number } = { x: 0, y: 0 };

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
    this.characterCanvas = new CanvasEnv(
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
    );
    this.worker = new Worker(
      new URL("../workers/characterWorker.ts", import.meta.url),
      {
        type: "module",
      },
    );
  }

  public updates(pos: { x: number; y: number }) {
    this.messageChannel.port1.postMessage({ pos });
    this.position = pos;
    requestAnimationFrame(() => this.updates(pos));
  }

  public render() {
    const offscreen = this.characterCanvas.canvas.transferControlToOffscreen();
    const img = new Image();
    img.src = this.spriteImageSrc;
    img.addEventListener("load", async () => {
      const spriteImage = await createImageBitmap(img);
      this.worker.postMessage(
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
