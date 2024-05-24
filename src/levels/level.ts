export default class Level {
  private ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public draw(x: number) {
    const image = new Image();
    image.src = "../../res/terrain.png";
    image.addEventListener("load", async () => {
      const bitMap = await createImageBitmap(image, 0, 0, 32, 32);
      this.ctx.drawImage(bitMap, 32 * x, 0);
    });
  }

  public render() {
    for (let i = 0; i < 40; i++) {
      this.draw(i);
    }
  }
}
