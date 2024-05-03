import Animation from "../animation/animation.js";

class ImageLoader {
  public msgPort: MessagePort;
  private eventSender: MessagePort;

  constructor() {
    const msg = new MessageChannel();
    this.msgPort = msg.port2;
    this.eventSender = msg.port1;
  }

  public static readonly Runsword01 = "../../res/10-Run Sword/RunSword01.png";
  public static readonly playerSprites = "../../res/player_sprites.png";
  public static readonly fierceTooth = "../../res/fierce_tooth.png";

  public loadImage(imagefile: string) {
    const imgHeight = 40;
    const imgWidth = 64;
    const scale = 2;
    const img = new Image();
    let bitImg: ImageBitmap;
    img.src = imagefile;
    img.addEventListener("load", async () => {
      const opt: ImageBitmapOptions = {
        resizeWidth: imgWidth * scale,
        resizeHeight: imgHeight * scale,
        resizeQuality: "pixelated",
      };
      bitImg = await createImageBitmap(img, opt);
      this.eventSender.postMessage(bitImg);
    });
  }

  public loadSprites(imagefile: string, Character: Animation) {
    const img = new Image();
    img.src = imagefile;

    img.addEventListener("load", async () => {
      const animationSets = Character.loadAnimationSets(img);
      const promisedAnimationSets = await Promise.all(animationSets);

      this.eventSender.postMessage({
        type: "sprites",
        load: promisedAnimationSets,
      });
    });
  }
}

export default ImageLoader;
