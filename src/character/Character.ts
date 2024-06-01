import Animation from "../animation/animation";
import GameEnv from "../env/GameEnv";
import Vector2d from "../utilz/Vector2d";
import { getModulofromAnimation } from "../utilz/getUrl";

export default class Character extends GameEnv {
  protected pos: Vector2d;
  public speed: number;
  protected animation: ImageBitmap[][] | null;
  protected spriteImage: string;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected animationState: number;
  protected scale: number;
  public messageChan = new MessageChannel();

  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    imgsrc: string,
    scale: number,
  ) {
    super();
    this.pos = new Vector2d(0, 0);
    this.speed = 5;
    this.animationFrames = animationFrames;
    this.spriteImage = imgsrc;
    this.animation = null;
    this.animationState = 0;
    this.scale = scale;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
  }

  public render() {
    this.drawAnimation();
  }

  //5 % 2 = 1
  //1 = 5 - 2*(5/2)
  public drawAnimation() {
    let animationTick = this.runAnimationTick();
    if (this.animation == null) {
      throw new Error("need to set animation first");
    }

    const modulo = getModulofromAnimation(
      animationTick,
      this.animation,
      this.animationState,
    );

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
    img.src = this.spriteImage;

    const animation = new Animation(
      img,
      this.animationFrames,
      this.imgWidth,
      this.imgHeight,
      this.scale,
    );

    img.addEventListener("load", async () => {
      const animationSets = await Promise.all(animation.loadAnimationSets());
      this.animation = animationSets;
      this.messageChan.port1.postMessage("resolvedImages");
    });
  }

  public update(x: number, y: number) {
    this.pos.update(x, y);
  }

  public setSpeed(s: number) {
    this.speed = s;
  }
}
