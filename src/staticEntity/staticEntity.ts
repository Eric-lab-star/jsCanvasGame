import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import { moduloGenerator } from "../utilz/helper";

export default class StaticEntity {
  private bitMapImages: ImageBitmap[] = [];
  private imageUrls: string[];
  private canvasEnv: CanvasEnv;
  private pos: { x: number; y: number };
  private width: number;
  private height: number;
  public channel: MessageChannel;
  private animationTick: number;
  private animationSpeed: number;
  public renderId: number | undefined;
  constructor(
    imagesUrls: string[],
    width: number = 24,
    height: number = 24,
    speed: number = 5,
  ) {
    this.pos = { x: 400, y: 400 };
    this.width = width;
    this.height = height;
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.imageUrls = imagesUrls;
    this.channel = new MessageChannel();
    this.animationTick = 0;
    this.animationSpeed = speed;
  }

  public async create() {
    await this.preloadImages();
    this.updatePos();
    this.render();
  }

  public updatePos() {
    this.channel.port2.onmessage = (event: MessageEvent) => {
      this.pos = event.data;
    };
  }

  public render() {
    this.canvasEnv.getCtx().reset();
    const modulo = moduloGenerator(
      Math.floor(this.animationTick / this.animationSpeed),
      4,
    );
    this.animationTick++;
    this.canvasEnv
      .getCtx()
      .drawImage(
        this.bitMapImages[modulo],
        this.pos.x - this.width / 2,
        this.pos.y - this.height / 2,
        this.width,
        this.height,
      );
    this.renderId = requestAnimationFrame(() => this.render());
  }

  public stopRender() {
    if (this.renderId) {
      cancelAnimationFrame(this.renderId);
      this.canvasEnv.getCtx().reset();
    }
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
}
