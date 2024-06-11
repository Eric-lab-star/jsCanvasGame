import GameEnv from "../env/GameEnv";
import CanvasEnv from "../env/CanvasEnv";

export default class Character {
  protected spriteImageSrc: string;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected scale: number;
  protected characterCanvas: CanvasEnv;
  protected animationState: number = 0;

  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    imgsrc: string,
    scale: number,
  ) {
    this.animationFrames = animationFrames;
    this.spriteImageSrc = imgsrc;
    this.scale = scale;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.characterCanvas = new CanvasEnv(
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
    );
  }

  public render() {
    const worker = new Worker(
      new URL("../workers/characterWorker.ts", import.meta.url),
      {
        type: "module",
      },
    );

    const offscreen = this.characterCanvas.canvas.transferControlToOffscreen();

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
          scale: this.scale,
        },
        [offscreen, spriteImage],
      );
    });
  }
}
