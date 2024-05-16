import Animation from "../animation/animation";
import KeyBoardInput from "../inputs/Keyboard";
import Vector2d from "../utilz/Vector2d";

type stateInfo = {
  [key: string]: number;
};

export default class Character {
  protected ctx: CanvasRenderingContext2D;
  protected pos: Vector2d;
  public speed: number;
  protected animation: ImageBitmap[][] | null;
  protected spriteImage: string;
  protected animationStates: stateInfo;
  protected imgWidth: number;
  protected imgHeight: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector2d,
    imgWidth: number,
    imgHeight: number,
    animationStates: stateInfo,
    imgsrc: string,
  ) {
    this.ctx = ctx;
    this.pos = position;
    this.speed = 5;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.animationStates = animationStates;
    this.spriteImage = imgsrc;
    this.animation = null;

    new KeyBoardInput(this);
  }

  /** handleAnimation function either getSprite image
   *or drawAnimation. Received Parameters are passed to
   * drawAnimation function
   */
  public handleAnimation(animationTick: number, animationState: number) {
    try {
      if (this.animation != undefined) {
        this.drawAnimation(animationTick, animationState);
      } else {
        this.setAnimation();
      }
    } catch (err) {
      console.log("error was dected");
      console.log(err);
    }
  }

  //5 % 2 = 1
  //1 = 5 - 2*(5/2)
  public drawAnimation(animationTick: number, animation: number) {
    if (this.animation == null) {
      throw new Error("animation is null");
    }

    const intValue = Math.floor(
      animationTick / this.animation[animation].length,
    );

    // 0 <= sprites[animation].length < i
    const modulo = animationTick - this.animation[animation].length * intValue;

    this.ctx.drawImage(
      this.animation[animation][modulo],
      this.pos.x,
      this.pos.y,
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
      this.animationStates,
      this.imgWidth,
      this.imgHeight,
    );

    const timeId = setTimeout(() => {
      throw new Error("too long");
    }, 200);

    img.addEventListener(
      "load",
      async () => {
        try {
          const animationSets = animation.loadAnimationSets();
          this.animation = await Promise.all(animationSets);
        } catch (err) {
          clearTimeout(timeId);
          throw err;
        }
        clearTimeout(timeId);
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
