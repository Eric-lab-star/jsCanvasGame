import Animation from "../animation/animation";
import GameEnv from "../env/GameEnv";
import { getModulofromAnimation } from "../utilz/helper";

export default class CharacterConsumer {
  protected animation: ImageBitmap[][] | null;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected animationState: number;
  protected scale: number;
  protected offscreen: OffscreenCanvas;
  protected spriteImage: ImageBitmap;
  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    scale: number,
    offscreen: OffscreenCanvas,
    spriteImage: ImageBitmap,
  ) {
    this.animationFrames = animationFrames;
    this.animation = null;
    this.animationState = 0;
    this.scale = scale;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.offscreen = offscreen;
    this.spriteImage = spriteImage;
  }

  public render() {
    const ctx = this.offscreen.getContext("2d");
    if (ctx === null) {
      throw new Error("context is null");
    }
    if (this.animation == null) {
      throw new Error("need to set animation first");
    }

    const modulo = getModulofromAnimation(
      GameEnv.runAnimationTick(),
      this.animation,
      this.animationState,
    );

    ctx.clearRect(0, 0, GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);

    ctx.drawImage(
      this.animation[this.animationState][modulo],
      0,
      0,
      this.imgWidth,
      this.imgHeight,
      0,
      0,
      this.imgWidth,
      this.imgHeight,
    );

    requestAnimationFrame(() => this.render());
  }

  public async setAnimation() {
    const animation = new Animation(
      this.spriteImage,
      this.animationFrames,
      this.imgWidth,
      this.imgHeight,
    );

    const animationSets = await Promise.all(animation.loadAnimationSets());
    this.animation = animationSets;
  }
}
