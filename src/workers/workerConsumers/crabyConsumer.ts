import Animation from "../../animation/animation";
import { CrabyAnimationManager } from "../../animation/animationManager/AnimationManager";
import GameEnv from "../../env/GameEnv";
import { moduloGenerator } from "../../utilz/helper";
import CharacterConsumer from "./characterConsumer";

export default class CrabyConsumer extends CharacterConsumer {
  constructor(
    offscreen: OffscreenCanvas,
    spriteImage: ImageBitmap,
    posPort: MessagePort,
  ) {
    super(offscreen, spriteImage, posPort);
  }

  protected setAnimationState(
    pos: { x: number; y: number },
    attack: string,
  ): void {
    if (attack !== "") {
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
      CrabyAnimationManager.states.get(this.animationState)!,
    );

    const images = CrabyAnimationManager.animations.get(this.animationState)!;

    if (this.shouldFlip) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        images[modulo],
        -(this.bodyPosition.x + CrabyAnimationManager.imgWidth / 2),
        this.bodyPosition.y - CrabyAnimationManager.imgHeight / 2 - 8,
        CrabyAnimationManager.imgWidth,
        CrabyAnimationManager.imgHeight,
      );
    } else {
      this.ctx.drawImage(
        images[modulo],
        this.bodyPosition.x - CrabyAnimationManager.imgWidth / 2,
        this.bodyPosition.y - CrabyAnimationManager.imgHeight / 2 - 8,
        CrabyAnimationManager.imgWidth,
        CrabyAnimationManager.imgHeight,
      );
    }
    requestAnimationFrame(() => this.render());
  }

  public async setAnimation(): Promise<void> {
    const animation = new Animation(
      this.spriteImage,
      CrabyAnimationManager.frames,
      CrabyAnimationManager.imgWidth,
      CrabyAnimationManager.imgHeight,
    );

    const animationSets = await Promise.all(animation.loadAnimationSets());
    const animationMapManager = new CrabyAnimationManager(animationSets);
    animationMapManager.setMap();
  }
}
