import Animation from "../animation/animation.js";
import ImageLoader from "../image/ImageLoader.js";
import KeyBoardInput from "../inputs/Keyboard.js";
import Vector2d from "../modules/Vector2d.js";

class Character {
  protected ctx: CanvasRenderingContext2D;
  protected pos: Vector2d;
  public speed: number;
  protected sprites: ImageBitmap[][];
  protected spriteImage: string;
  protected animationStates: { [key: string]: number };
  protected imgWidth: number;
  protected imgHeight: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector2d,
    imgWidth: number,
    imgHeight: number,
  ) {
    this.ctx = ctx;
    this.pos = position;
    this.speed = 5;
    this.spriteImage = ImageLoader.playerSprites;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;

    new KeyBoardInput(this);
  }

  /** handleAnimation function either getSprite image
   *or drawAnimation. Received Parameters are passed to
   * drawAnimation function
   */
  public handleAnimation(animationTick: number, animation: number) {
    if (this.sprites != undefined) {
      this.drawAnimation(animationTick, animation);
    } else {
      this.setSprites();
    }
  }

  //5 % 2 = 1
  //1 = 5 - 2*(5/2)
  public drawAnimation(animationTick: number, animation: number) {
    const intValue = Math.floor(animationTick / this.sprites[animation].length);
    const modulo = animationTick - this.sprites[animation].length * intValue; // 0 <= sprites[animation].length < i
    this.ctx.drawImage(this.sprites[animation][modulo], this.pos.x, this.pos.y);
  }

  public setSprites() {
    const loader = new ImageLoader();
    const animation = new Animation(
      this.animationStates,
      this.imgWidth,
      this.imgHeight,
    );
    loader.loadSprites(this.spriteImage, animation);
    loader.msgPort.onmessage = (e: MessageEvent) => {
      if (e.data.type == "sprites") {
        this.sprites = e.data.load;
      }
    };
  }

  public update(x: number, y: number) {
    this.pos.update(x, y);
  }

  public setSpeed(s: number) {
    this.speed = s;
  }
}

export default Character;
