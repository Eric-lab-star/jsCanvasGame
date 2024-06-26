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
    offscreen: OffscreenCanvas,
    spriteImage: ImageBitmap,
    posPort: MessagePort,
  ) {
    super(offscreen, spriteImage, posPort);
  }
  protected setAnimationState(
    pos: { x: number; y: number },
    signalType: string,
  ): void {
    if (signalType === "stop") {
      this.animationState = "idle";
      return;
    }
    if (signalType === "hit") {
      this.animationState = "hit";
      return;
    }
    if (signalType === "attack") {
      this.animationState = "attack";
      return;
    }

    if (pos.x > this.bodyPosition.x + 1) {
      this.animationState = "run";
      this.shouldFlip = false;
      return;
    }
    if (pos.x < this.bodyPosition.x - 1) {
      this.animationState = "run";
      this.shouldFlip = true;
      return;
    }

    if (pos.y < this.bodyPosition.y - 2) {
      this.animationState = "jump";
      return;
    }

    if (pos.y > this.bodyPosition.y + 2) {
      this.animationState = "fall";
      return;
    }

    if (
      Math.abs(pos.x - this.bodyPosition.x) <= 0.001 &&
      Math.abs(pos.y - this.bodyPosition.y) <= 0.001
    ) {
      this.animationState = "idle";
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
        -(this.bodyPosition.x + SharkAnimationManager.imgWidth / 2),
        this.bodyPosition.y - SharkAnimationManager.imgHeight / 2 - 10,
        SharkAnimationManager.imgWidth,
        SharkAnimationManager.imgHeight,
      );
    } else {
      this.ctx.drawImage(
        images[modulo],
        this.bodyPosition.x - SharkAnimationManager.imgWidth / 2,
        this.bodyPosition.y - SharkAnimationManager.imgHeight / 2 - 10,
        SharkAnimationManager.imgWidth,
        SharkAnimationManager.imgHeight,
      );
    }
    requestAnimationFrame(() => this.render());
  }

  public async setAnimation(): Promise<void> {
    const animation = new Animation(
      this.spriteImage,
      SharkAnimationManager.frames,
      SharkAnimationManager.imgWidth,
      SharkAnimationManager.imgHeight,
    );
    const animationSets = await Promise.all(animation.loadAnimationSets());
    const animationMapManager = new SharkAnimationManager(animationSets);
    animationMapManager.setMap();
  }
}
