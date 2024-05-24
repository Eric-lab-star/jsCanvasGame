import Animation from "../animation/animation";
import Vector2d from "../utilz/Vector2d";

export default class Character {
  protected ctx: CanvasRenderingContext2D;
  protected pos: Vector2d;
  public speed: number;
  protected animation: ImageBitmap[][] | null;
  protected spriteImage: string;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected animationState: number;
  private animationTick: number = 0;
  private animationSpeed: number = 10;
  protected scale: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector2d,
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    imgsrc: string,
    scale: number,
  ) {
    this.ctx = ctx;
    this.pos = position;
    this.speed = 5;
    this.animationFrames = animationFrames;
    this.spriteImage = imgsrc;
    this.animation = null;
    this.animationState = 0;
    this.scale = scale;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
  }

  //5 % 2 = 1
  //1 = 5 - 2*(5/2)
  public drawAnimation() {
    this.animationTick += 1 / this.animationSpeed;
    let animationTick = Math.floor(this.animationTick);
    if (this.animation == null) {
      throw new Error("need to set animation first");
    }

    const intValue = Math.floor(
      animationTick / this.animation[this.animationState].length,
    );

    // 0 <= sprites[animation].length < i
    const modulo =
      animationTick - this.animation[this.animationState].length * intValue;

    this.ctx.clearRect(
      this.pos.x + this.imgHeight - 20,
      this.pos.y - 20,
      this.imgWidth + 10 + 40,
      this.imgHeight + 25 + 40,
    );

    this.drawHitBox();

    this.ctx.drawImage(
      this.animation[this.animationState][modulo],
      this.pos.x,
      this.pos.y,
    );

    requestAnimationFrame(() => this.drawAnimation());
  }

  public drawHitBox() {
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(
      this.pos.x + this.imgHeight,
      this.pos.y,
      this.imgWidth + 10,
      this.imgHeight + 25,
    );
  }

  /**
   * create Character image and set animation
   * */
  public setAnimation() {
    const img = new Image();
    const animation = new Animation(
      img,
      this.spriteImage,
      this.animationFrames,
      this.imgWidth,
      this.imgHeight,
      this.scale,
    );

    img.addEventListener(
      "load",
      async () => {
        const animationSets = await Promise.all(animation.loadAnimationSets());
        this.animation = animationSets;
        this.drawAnimation();
      },
      { once: true, passive: false },
    );
  }

  public update(x: number, y: number) {
    this.pos.update(x, y);
  }

  public setSpeed(s: number) {
    this.speed = s;
  }
}
