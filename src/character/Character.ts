import Matter from "matter-js";
import GameEnv from "../env/GameEnv";
import CanvasEnv from "../env/CanvasEnv";

const { Bodies } = Matter;

export default class Character {
  protected spriteImageSrc: string;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected scale: number;
  public hitBox: Matter.Body;
  protected characterCanvas: CanvasEnv;

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
    this.hitBox = this.setHitBox(
      GameEnv.GAME_WIDTH / 2,
      GameEnv.GAME_HEIGHT / 2,
      0,
      0,
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
          hitBox: this.hitBox,
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

  public setHitBox(
    xPos: number,
    yPos: number,
    xOffset: number,
    yOffset: number,
  ) {
    const hitBox = Bodies.rectangle(
      xPos,
      yPos,
      this.imgWidth - xOffset,
      this.imgHeight - yOffset,
      {
        render: {
          opacity: 0,
        },
        frictionAir: 0,
        label: "character",
      },
    );
    return hitBox;
  }
}
