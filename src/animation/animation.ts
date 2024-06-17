/**
 * creates animation from sprite image
 * */
export default class Animation {
  protected image: ImageBitmap;
  protected imgHeight: number;
  protected imgWidth: number;
  protected frames: number[];

  constructor(
    image: ImageBitmap,
    frames: number[],
    imgWidth: number,
    imgHeight: number,
  ) {
    this.image = image;
    this.frames = frames;
    this.imgHeight = imgHeight;
    this.imgWidth = imgWidth;
  }

  /**
   * loadAnimationStates is used to load group of multiple animations
   *
   */
  public loadAnimationSets() {
    const animationSets = this.frames.map(
      async (x, y) => await this.mapHandler(x, y),
    );
    return animationSets;
  }

  /**
   * mapHanlder is called on each frames to load animation
   * */
  protected async mapHandler(x: number, y: number) {
    const load = this.loadAnimation(x, y);
    const animation = await Promise.all(load);
    return animation;
  }

  /**
   * loadAnimation function is used to load animation from sprite image
   * */
  protected loadAnimation(x: number, y: number) {
    const imgs: Promise<ImageBitmap>[] = [];
    for (let i = 0; i < x; i++) {
      const img = this.createImageBitmap(i, y);
      imgs.push(img);
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
    );
  }
}
