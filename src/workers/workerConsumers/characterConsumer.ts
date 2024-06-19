import GameEnv from "../../env/GameEnv";

/**
 * @class CharacterConsumer
 * @description This class is responsible for consuming the character's position and rendering the character on the screen. This class is used by the character class
 * */
export default abstract class CharacterConsumer {
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected animationState: string;
  protected offscreen: OffscreenCanvas;
  protected spriteImage: ImageBitmap;
  protected ctx: OffscreenCanvasRenderingContext2D;
  protected animationPort: MessagePort;
  protected bodyPosition: { x: number; y: number } = {
    x: GameEnv.GAME_WIDTH / 2,
    y: GameEnv.GAME_HEIGHT / 2,
  };
  protected shouldFlip: boolean = false;

  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    offscreen: OffscreenCanvas,
    spriteImage: ImageBitmap,
    posPort: MessagePort,
  ) {
    this.animationFrames = animationFrames;
    this.animationState = "idle";
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.offscreen = offscreen;
    this.spriteImage = spriteImage;
    this.animationPort = posPort;
    this.ctx = this.offscreen.getContext("2d")!;
    this.updateAnimation();
  }

  /**
   * @method updateAnimation
   * @description This method listens to the position of the character and updates the position of the character on the screen.
   * */
  protected updateAnimation(): void {
    this.animationPort.onmessage = (
      e: MessageEvent<{ pos: { x: number; y: number }; attack: string }>,
    ) => {
      this.setAnimationState(e.data.pos, e.data.attack);
      this.bodyPosition = e.data.pos;
    };
  }
  protected abstract setAnimationState(
    pos: { x: number; y: number },
    attack: string,
  ): void;

  public abstract render(): void;

  public abstract setAnimation(): Promise<void>;
}
