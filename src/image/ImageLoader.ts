import Animation from "../animation/animation.js";

type stateInfo = {
  [key: string]: number;
};

export default class ImageLoader {
  public msgPort: MessagePort;
  private eventSender: MessagePort;

  constructor() {
    const msg = new MessageChannel();
    this.msgPort = msg.port2;
    this.eventSender = msg.port1;
  }

  /** load single image from file*/
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

  /**loads sprites to create animation
   * images are passed by MessageChannel
   * */
  public loadSprites(
    imagefile: string,
    animationStates: stateInfo,
    imgwidth: number,
    imgHeight: number,
  ) {
    const img = new Image();
    const animation = new Animation(
      img,
      "../../res/player_sprites.png",
      animationStates,
      imgwidth,
      imgHeight,
    );
    img.src = imagefile;
    img.addEventListener("load", async () => {
      const animationSets = animation.loadAnimationSets();
      const promisedAnimationSets = await Promise.all(animationSets);
      this.eventSender.postMessage({
        type: "sprites",
        load: promisedAnimationSets,
      });
    });
  }
}
