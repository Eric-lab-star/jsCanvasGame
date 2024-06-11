import Animation from "../animation/animation";
import GameEnv from "../env/GameEnv";
import { getModulofromAnimation } from "../utilz/helper";

export default class CharacterConsumer {
  protected animation: ImageBitmap[][] | null;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected animationState: number;
  protected offscreen: OffscreenCanvas;
  protected spriteImage: ImageBitmap;
  protected ctx: OffscreenCanvasRenderingContext2D;
  public posPort: MessagePort;
  private bodyPosition: { x: number; y: number } = { x: 0, y: 0 };
  // private bodyPosition: { x: number; y: number } = {
  //   x: GameEnv.GAME_WIDTH / 2,
  //   y: GameEnv.GAME_HEIGHT / 2,
  // };
  private shouldFlip: boolean = false;

  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    offscreen: OffscreenCanvas,
    spriteImage: ImageBitmap,
    posPort: MessagePort,
  ) {
    this.animationFrames = animationFrames;
    this.animation = null;
    this.animationState = 0;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.offscreen = offscreen;
    this.spriteImage = spriteImage;
    this.posPort = posPort;
    this.ctx = this.offscreen.getContext("2d")!;
    this.readPort();
  }

  // read hitbox position
  public readPort() {
    this.posPort.onmessage = (e) => {
      this.setAnimationState(e.data.pos);
      this.bodyPosition = e.data.pos;
    };
  }

  public setAnimationState(pos: { x: number; y: number }) {
    if (pos.x > this.bodyPosition.x + 1) {
      this.animationState = 1;
      this.shouldFlip = false;
      return;
    }
    if (pos.x < this.bodyPosition.x - 1) {
      this.animationState = 1;
      this.shouldFlip = true;
      return;
    }

    if (pos.y < this.bodyPosition.y - 1) {
      this.animationState = 2;
      return;
    }

    if (pos.y > this.bodyPosition.y + 1) {
      this.animationState = 3;
      return;
    }
    this.animationState = 0;
  }

  // must be called after setting this.animation
  public render() {
    this.ctx.reset();

    const modulo = getModulofromAnimation(
      GameEnv.runAnimationTick(),
      this.animation!,
      this.animationState,
    );

    if (this.shouldFlip) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.animation![this.animationState][modulo],
        -(this.bodyPosition.x + this.imgWidth / 2),
        this.bodyPosition.y - this.imgHeight / 2,
        this.imgWidth,
        this.imgHeight,
      );
    } else {
      this.ctx.drawImage(
        this.animation![this.animationState][modulo],
        this.bodyPosition.x - this.imgWidth / 2,
        this.bodyPosition.y - this.imgHeight / 2,
        this.imgWidth,
        this.imgHeight,
      );
    }

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
