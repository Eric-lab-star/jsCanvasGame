import AnimationManager from "../animationManager/AnimationManager.js";

export default class Animation {
  protected manager: AnimationManager;
  protected opt: ImageBitmapOptions;
  protected imgHeight: number;
  protected imgWidth: number;
  constructor(
    frameInfoObj: { [key: string]: number },
    imgHeight: number,
    imgWidth: number,
  ) {
    this.manager = new AnimationManager(frameInfoObj);
    this.imgHeight = imgHeight;
    this.imgWidth = imgWidth;
    this.opt = {
      resizeWidth: this.imgWidth * Animation.scale,
      resizeHeight: this.imgHeight * Animation.scale,
      resizeQuality: "pixelated",
    };
  }

  protected static scale = 2;

  public loadAnimationSets(img: HTMLImageElement) {
    const animationSets = this.manager.values.map(async (x, y) => {
      const animation = this.loader(x, y, img);
      return Promise.all(animation);
    });
    return animationSets;
  }

  public loader(x: number, y: number, img: HTMLImageElement) {
    const imgs: Promise<ImageBitmap>[] = [];
    for (let i = 0; i < x; i++) {
      imgs.push(this.createImageBitmap(img, i, y));
    }
    return imgs;
  }

  protected createImageBitmap(img: HTMLImageElement, x: number, y: number) {
    return createImageBitmap(
      img,
      this.imgWidth * x,
      this.imgHeight * y,
      this.imgWidth,
      this.imgHeight,
      this.opt,
    );
  }
}
