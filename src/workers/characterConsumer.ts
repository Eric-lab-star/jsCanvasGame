import Animation from "../animation/animation";
import GameEnv from "../env/GameEnv";
import { getModulofromAnimation } from "../utilz/getUrl";

export default class CharacterConsumer {
  protected animation: ImageBitmap[][] | null;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected animationState: number;
  protected scale: number;
  public hitBox: Matter.Body;
  protected offscreen: OffscreenCanvas;
  protected spriteImage: ImageBitmap;
  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    scale: number,
    offscreen: OffscreenCanvas,
    hitBox: Matter.Body,
    spriteImage: ImageBitmap,
  ) {
    this.animationFrames = animationFrames;
    this.animation = null;
    this.animationState = 0;
    this.scale = scale;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.offscreen = offscreen;
    this.hitBox = hitBox;
    this.spriteImage = spriteImage;
  }

  /**
   * Renders the character on the canvas.
   *
   * This method first gets the 2D rendering context from the offscreen canvas. If the context is null, it throw error
   *
   * It then checks if the animation has been set. If not, it throws an error.
   *
   * It calculates the modulo from the animation tick, animation, and animation state using the `getModulofromAnimation` function.
   *
   * It then clears the entire canvas and draws the current frame of the animation at the character's position.
   *
   * Finally, requestAnimationFrame is called to render the next frame.
   */
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
      this.hitBox.position.x - this.imgWidth,
      this.hitBox.position.y - this.imgHeight - 2,
    );
    requestAnimationFrame(() => this.render());
  }

  /**
   * Asynchronously sets the animation for the character.
   *
   * This method first creates a new Animation instance using the character's sprite image,
   * animation frames, image width, image height, and scale.
   *
   * It then loads all animation sets from the Animation instance and stores them in the `animation` property.
   *
   */
  public async setAnimation() {
    const animation = new Animation(
      this.spriteImage,
      this.animationFrames,
      this.imgWidth,
      this.imgHeight,
      this.scale,
    );

    const animationSets = await Promise.all(animation.loadAnimationSets());
    this.animation = animationSets;
  }
}
