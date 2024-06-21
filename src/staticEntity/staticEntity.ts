import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";

export default class StaticEntity {
  private bitMapImages: ImageBitmap[] = [];
  private imageUrls: string[];
  private canvasEnv: CanvasEnv;
  private width: number;
  private height: number;
  public channel: MessageChannel;
  private animationSpeed: number;
  private worker: Worker;
  constructor(
    imagesUrls: string[],
    width: number = 24,
    height: number = 24,
    speed: number = 5,
  ) {
    this.width = width;
    this.height = height;
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.imageUrls = imagesUrls;
    this.channel = new MessageChannel();
    this.animationSpeed = speed;
    this.worker = new Worker(
      new URL("../workers/staticEntityWorker", import.meta.url),
      {
        type: "module",
      },
    );
  }

  public async create() {
    await this.preloadImages();
    this.render();
  }

  public render() {
    const offscreenCanvas = this.canvasEnv.canvas.transferControlToOffscreen();

    this.worker.postMessage(
      {
        type: "create",
        canvas: offscreenCanvas,
        bitMapImages: this.bitMapImages,
        port: this.channel.port2,
        width: this.width,
        height: this.height,
        speed: this.animationSpeed,
      },
      [offscreenCanvas, this.channel.port2],
    );
  }

  public async preloadImages() {
    const promises: Promise<boolean>[] = [];
    this.imageUrls.forEach((img) => {
      const promise: Promise<boolean> = new Promise((resolve) => {
        const image = new Image();
        image.src = img;
        image.onload = async () => {
          const bitMapImage = await createImageBitmap(image);
          this.bitMapImages.push(bitMapImage);
          resolve(true);
        };
      });
      promises.push(promise);
    });
    await Promise.all(promises);
  }

  public stopRender() {
    this.worker.postMessage({ type: "stop" });
  }
}
