export default class Levels {
  private ctx: CanvasRenderingContext2D;
  private bitmapImg: ImageBitmap | null;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.bitmapImg = null;
  }

  protected loadLevelAtlas(image: HTMLImageElement) {
    const imgs: ImageBitmap[] = [];
    for (let i = 0; i < 150; i++) {
      const bimgs = this.createImageBitmap(i, image);
      bimgs
        .then((bimg) => {
          imgs.push(bimg);
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }

    return imgs;
  }

  protected createImageBitmap(x: number, image: HTMLImageElement) {
    return createImageBitmap(image, 64 * x, 0, 64, 64);
  }

  public drawImage() {
    const img = new Image();
    img.src = "";
    img.addEventListener("load", async () => {
      const imgArray: ImageBitmap[] = [];
      for (let i = 0; i < 5; i++) {
        const imgbit = await createImageBitmap(img, 64 * i, 0, 64, 64);
        imgArray[i] = imgbit;
      }
      this.ctx.drawImage(imgArray[1], 0, 0);
    });
  }
}
