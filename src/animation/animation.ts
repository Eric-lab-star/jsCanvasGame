/**
 * creates animation from sprite image
 * */
export default class Animation {
  protected image: HTMLImageElement;
  protected spriteImage: string;
  protected opt: ImageBitmapOptions;
  protected imgHeight: number;
  protected imgWidth: number;
  protected frames: number[];

  protected static scale = 2;

  constructor(
    image: HTMLImageElement,
    spriteImage: string,
    frames: number[],
    imgWidth: number,
    imgHeight: number,
  ) {
    this.image = image;
    this.spriteImage = spriteImage;
    this.frames = frames;
    this.imgHeight = imgHeight;
    this.imgWidth = imgWidth;
    this.opt = {
      resizeWidth: this.imgWidth * Animation.scale,
      resizeHeight: this.imgHeight * Animation.scale,
      resizeQuality: "pixelated",
    };
    this.image.src = this.spriteImage;
  }

  /**
   * loadAnimationStates is used to load group of multiple animations
   *
   */
  public loadAnimationSets() {
    const animationSets = this.frames.map((x, y) => this.mapHandler(x, y));
    return animationSets;
  }

  /**
   * mapHanlder is called on each frames to load animation
   * */
  protected mapHandler(x: number, y: number) {
    const animation = this.loadAnimation(x, y);
    return animation;
  }

  /**
   * loadAnimation function is used to load animation from sprite image
   * */
  protected loadAnimation(x: number, y: number) {
    const imgs: ImageBitmap[] = [];
    for (let i = 0; i < x; i++) {
      const img = this.createImageBitmap(i, y);
      img
        .then((img) => imgs.push(img))
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }
    return imgs;
  }

  /**
   * createImageBitmap function is a wrapper function of createImageBitmap webapi
   * */
  protected createImageBitmap(x: number, y: number) {
    return createImageBitmap(
      this.image,
      this.imgWidth * x,
      this.imgHeight * y,
      this.imgWidth,
      this.imgHeight,
      this.opt,
    );
  }
}
