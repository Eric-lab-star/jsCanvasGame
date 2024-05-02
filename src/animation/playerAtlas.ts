class PlayerAtlas {
  constructor() {}

  public static idle: number = 5;
  public static jump1: number = 6;
  public static jump2: number = 3;
  public static fall: number = 1;
  public static hit1: number = 2;
  public static hit2: number = 3;
  public static attack1: number = 3;
  public static attack2: number = 3;
  public static attack3: number = 3;
  public static totalStates: number = 9;

  private static imgHeight = 40;
  private static imgWidth = 64;
  private static scale = 2;
  private static opt: ImageBitmapOptions = {
    resizeWidth: PlayerAtlas.imgWidth * PlayerAtlas.scale,
    resizeHeight: PlayerAtlas.imgHeight * PlayerAtlas.scale,
    resizeQuality: "pixelated",
  };

  public static parser(state: number, img: HTMLImageElement) {
    const imgs: Promise<ImageBitmap>[] = [];
    for (let i = 0; i < state; i++) {
      imgs.push(
        createImageBitmap(
          img,
          PlayerAtlas.imgWidth * i,
          0,
          PlayerAtlas.imgWidth,
          PlayerAtlas.imgHeight,
          PlayerAtlas.opt,
        ),
      );
    }
    return imgs;
  }
}

export default PlayerAtlas;
