import Animation from "../animation/animation";
import { AnimationMapManager } from "../animation/animationManager/AnimationManager";
import GameEnv from "../env/GameEnv";
import { getModulofromAnimation, moduloGenerator } from "../utilz/helper";

/**
 * @class CharacterConsumer
 * @description This class is responsible for consuming the character's position and rendering the character on the screen. This class is used by the character class
 * */
export default class CharacterConsumer {
  public animation: ImageBitmap[][] | null;
  private animationFrames: number[];
  private imgWidth: number;
  private imgHeight: number;
  private animationState: string;
  private offscreen: OffscreenCanvas;
  private spriteImage: ImageBitmap;
  private ctx: OffscreenCanvasRenderingContext2D;
  private posPort: MessagePort;
  private bodyPosition: { x: number; y: number } = {
    x: GameEnv.GAME_WIDTH / 2,
    y: GameEnv.GAME_HEIGHT / 2,
  };
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
    this.animationState = "idleS";
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.offscreen = offscreen;
    this.spriteImage = spriteImage;
    this.posPort = posPort;
    this.ctx = this.offscreen.getContext("2d")!;
    this.updatePos();
  }
  private counter: number = 0;

  /**
   * @method updatePos
   * @description This method listens to the position of the character and updates the position of the character on the screen.
   * */
  private updatePos(): void {
    this.posPort.onmessage = (e) => {
      this.setAnimationState(e.data.pos);
      this.bodyPosition = e.data.pos;
    };
  }

  private setAnimationState(pos: { x: number; y: number }): void {
    if (pos.x > this.bodyPosition.x + 1) {
      this.animationState = "run";
      this.shouldFlip = false;
      this.counter = 0;
      return;
    }
    if (pos.x < this.bodyPosition.x - 1) {
      this.animationState = "run";
      this.shouldFlip = true;
      this.counter = 0;
      return;
    }

    if (pos.y < this.bodyPosition.y - 2) {
      this.animationState = "jump";
      this.counter = 0;
      return;
    }

    if (pos.y > this.bodyPosition.y + 2) {
      this.animationState = "fall";
      this.counter = 0;
      return;
    }

    if (
      Math.abs(pos.x - this.bodyPosition.x) <= 0.0 &&
      Math.abs(pos.y - this.bodyPosition.y) <= 0.0
    ) {
      this.counter++;
      if (this.counter > 4) {
        this.animationState = "idleS";
      }
    }
  }

  /**
   * @method render
   * @description This method renders the character on the screen.
   * must be called after setting animtion by calling this.setAnimation
   * */
  public render(): void {
    this.ctx.reset();

    const modulo = moduloGenerator(
      GameEnv.runAnimationTick(),
      AnimationMapManager.states.get(this.animationState)!,
    );

    const images = AnimationMapManager.animations.get(this.animationState)!;

    if (this.shouldFlip) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        images[modulo],
        -(this.bodyPosition.x + this.imgWidth / 2),
        this.bodyPosition.y - this.imgHeight / 2,
        this.imgWidth,
        this.imgHeight,
      );
    } else {
      this.ctx.drawImage(
        images[modulo],
        this.bodyPosition.x - this.imgWidth / 2,
        this.bodyPosition.y - this.imgHeight / 2,
        this.imgWidth,
        this.imgHeight,
      );
    }
    requestAnimationFrame(() => this.render());
  }

  public async setAnimation(): Promise<void> {
    const animation = new Animation(
      this.spriteImage,
      this.animationFrames,
      this.imgWidth,
      this.imgHeight,
    );
    const animationSets = await Promise.all(animation.loadAnimationSets());
    const animationMapManager = new AnimationMapManager(animationSets);
    animationMapManager.setMap();
    this.animation = animationSets;
  }
}
