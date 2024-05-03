class PlayerAnimation {
  constructor() {}

  public static readonly idle: number = 0;
  public static readonly run: number = 1;
  public static readonly jump: number = 2;
  public static readonly fall: number = 3;
  public static readonly hit1: number = 4;
  public static readonly hit2: number = 5;
  public static readonly attack1: number = 6;
  public static readonly attack2: number = 7;
  public static readonly attack3: number = 8;

  private static states = [5, 6, 3, 1, 2, 3, 3, 3, 3];
  private static imgHeight = 40;
  private static imgWidth = 64;
  private static scale = 2;
  private static opt: ImageBitmapOptions = {
    resizeWidth: PlayerAnimation.imgWidth * PlayerAnimation.scale,
    resizeHeight: PlayerAnimation.imgHeight * PlayerAnimation.scale,
    resizeQuality: "pixelated",
  };

  public static loadAnimationSets(img: HTMLImageElement) {
    const animationSets = PlayerAnimation.states.map(async (x, y) => {
      const animation = PlayerAnimation.loader(x, y, img);
      return Promise.all(animation);
    });
    return animationSets;
  }

  public static loader(x: number, y: number, img: HTMLImageElement) {
    const imgs: Promise<ImageBitmap>[] = [];
    for (let i = 0; i < x; i++) {
      imgs.push(PlayerAnimation.createImageBitmap(img, i, y));
    }
    return imgs;
  }

  private static createImageBitmap(
    img: HTMLImageElement,
    x: number,
    y: number,
  ) {
    return createImageBitmap(
      img,
      PlayerAnimation.imgWidth * x,
      PlayerAnimation.imgHeight * y,
      PlayerAnimation.imgWidth,
      PlayerAnimation.imgHeight,
      PlayerAnimation.opt,
    );
  }
}

export default PlayerAnimation;
