import { moduloGenerator } from "../utilz/helper";
let entityWorker: StaticEntityWorker;
self.onmessage = (e: MessageEvent) => {
  if (e.data.type === "create") {
    entityWorker = new StaticEntityWorker(
      e.data.canvas,
      e.data.bitMapImages,
      e.data.width,
      e.data.height,
      e.data.speed,
      e.data.port,
    );
    entityWorker.create();
  }
  if (e.data.type === "stop") {
    entityWorker.stopRender();
  }
};

export default class StaticEntityWorker {
  private offscreenCanvas: OffscreenCanvas;
  private bitMapImages: ImageBitmap[];
  private pos: { x: number; y: number };
  private width: number;
  private height: number;
  private animationTick: number;
  private animationSpeed: number;
  public renderId: number | undefined;
  private port: MessagePort;
  private ctx: OffscreenCanvasRenderingContext2D;
  constructor(
    offscreenCanvas: OffscreenCanvas,
    bitMapImages: ImageBitmap[],
    width: number = 24,
    height: number = 24,
    speed: number = 5,
    port: MessagePort,
  ) {
    this.pos = { x: 400, y: 400 };
    this.width = width;
    this.height = height;
    this.animationTick = 0;
    this.animationSpeed = speed;
    this.port = port;
    this.offscreenCanvas = offscreenCanvas;
    this.bitMapImages = bitMapImages;
    this.ctx = this.offscreenCanvas.getContext("2d")!;
  }

  public async create() {
    this.updatePos();
    this.render();
  }

  public updatePos() {
    this.port.onmessage = (event: MessageEvent) => {
      this.pos = event.data;
    };
  }

  public render() {
    this.ctx.reset();
    const modulo = moduloGenerator(
      Math.floor(this.animationTick / this.animationSpeed),
      4,
    );
    this.animationTick++;
    this.ctx.drawImage(
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
      this.ctx.reset();
    }
  }
}
