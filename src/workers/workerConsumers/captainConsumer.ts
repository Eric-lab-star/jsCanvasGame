import Animation from "../../animation/animation";
import { CaptainAnimationManager } from "../../animation/animationManager/AnimationManager";
import GameEnv from "../../env/GameEnv";
import { moduloGenerator } from "../../utilz/helper";
import CharacterConsumer from "./characterConsumer";

export default class CaptainConsumer extends CharacterConsumer {
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

  protected setAnimationState(
    pos: { x: number; y: number },
    attack: string,
  ): void {
    if (attack !== "") {
      this.animationState = attack;
      return;
    }

    if (pos.x > this.bodyPosition.x + 1) {
      this.animationState = "runS";
      this.shouldFlip = false;
      return;
    }
    if (pos.x < this.bodyPosition.x - 1) {
      this.animationState = "runS";
      this.shouldFlip = true;
      return;
    }

    if (pos.y < this.bodyPosition.y - 2) {
      this.animationState = "jumpS";
      return;
    }

    if (pos.y > this.bodyPosition.y + 2) {
      this.animationState = "fallS";
      return;
    }

    if (
      Math.abs(pos.x - this.bodyPosition.x) <= 0.001 &&
      Math.abs(pos.y - this.bodyPosition.y) <= 0.001
    ) {
      this.animationState = "idleS";
    }
  }

  public render(): void {
    this.ctx.reset();

    const modulo = moduloGenerator(
      GameEnv.runAnimationTick(),
      CaptainAnimationManager.states.get(this.animationState)!,
    );
    const images = CaptainAnimationManager.animations.get(this.animationState)!;

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
    const animationMapManager = new CaptainAnimationManager(animationSets);
    animationMapManager.setMap();
  }
}
