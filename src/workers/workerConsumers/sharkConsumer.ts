import Animation from "../../animation/animation";
import { SharkAnimationManager } from "../../animation/animationManager/AnimationManager";
import GameEnv from "../../env/GameEnv";
import { moduloGenerator } from "../../utilz/helper";
import CharacterConsumer from "./characterConsumer";

export default class SharkConsumer extends CharacterConsumer {
  /**
   *
   */

  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    offscreen: OffscreenCanvas,
    spriteImage: ImageBitmap,
    posPort: MessagePort,
  ) {
    super(
      imgWidth,
      imgHeight,
      animationFrames,
      offscreen,
      spriteImage,
      posPort,
    );
  }
  private counter: number = 0;

  protected setAnimationState(
    pos: { x: number; y: number },
    attack: string,
  ): void {
    if (attack !== "") {
      this.animationState = attack;
      return;
    }

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
      if (this.counter > 3) {
        this.animationState = "idle";
      }
    }
  }

  public render(): void {
    this.ctx.reset();

    const modulo = moduloGenerator(
      GameEnv.runAnimationTick(),
      SharkAnimationManager.states.get(this.animationState)!,
    );
    const images = SharkAnimationManager.animations.get(this.animationState)!;

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
    const animationMapManager = new SharkAnimationManager(animationSets);
    animationMapManager.setMap();
  }
}
