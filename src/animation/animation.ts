import AnimationManager from "../animationManager/AnimationManager.js";

/**
 * Animation Class
 *
 * creates animation from sprite image
 * */
export default class Animation {
  protected manager: AnimationManager;
  protected opt: ImageBitmapOptions;
  protected imgHeight: number;
  protected imgWidth: number;
  constructor(
    stateObj: { [key: string]: number },
    imgWidth: number,
    imgHeight: number,
  ) {
    this.manager = new AnimationManager(stateObj);
    this.imgHeight = imgHeight;
    this.imgWidth = imgWidth;
    this.opt = {
      resizeWidth: this.imgWidth * Animation.scale,
      resizeHeight: this.imgHeight * Animation.scale,
      resizeQuality: "pixelated",
    };
  }

  protected static scale = 2;

  /**
   * loadAnimationStates is used to load group of multiple animations
   */
  public loadAnimationStates(img: HTMLImageElement) {
    const animationSets = this.manager.values.map(async (x, y) => {
      const animation = this.loadAnimation(x, y, img);
      return Promise.all(animation);
    });
    return animationSets;
  }

  /**
   * loadAnimation function is used to load animation from sprite image
   * */
  protected loadAnimation(x: number, y: number, img: HTMLImageElement) {
    const imgs: Promise<ImageBitmap>[] = [];
    for (let i = 0; i < x; i++) {
      imgs.push(this.createImageBitmap(img, i, y));
    }
    return imgs;
  }

  /**
   * createImageBitmap function is a wrapper function of createImageBitmap webapi
   * */
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
