import PlayerAtlas from "../animation/playerAtlas.js";

class ImageLoader {
  public msgPort: MessagePort;
  private eventSender: MessagePort;

  constructor() {
    const msg = new MessageChannel();
    this.msgPort = msg.port2;
    this.eventSender = msg.port1;
  }

  public static Runsword01 = "../../res/10-Run Sword/RunSword01.png";
  public static Sprites = "../../res/player_sprites.png";

  public load(imagefile: string) {
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

  public loadSprites(imagefile: string) {
    const img = new Image();
    img.src = imagefile;

    img.addEventListener("load", async () => {
      const player = new PlayerAtlas();
      // TODO: make animation atalas

      for (let i = 0; i < PlayerAtlas.totalStates; i++) {}

      const idle = await Promise.all(PlayerAtlas.parser(PlayerAtlas.idle, img));

      this.eventSender.postMessage({ type: "sprites", load: idle });
    });
  }
}

export default ImageLoader;
