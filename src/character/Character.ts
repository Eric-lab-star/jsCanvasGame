import Matter from "matter-js";
import Animation from "../animation/animation";
import GameEnv from "../env/GameEnv";
import { getModulofromAnimation } from "../utilz/getUrl";
import CanvasEnv from "../env/CanvasEnv";

const { Bodies } = Matter;

export default class Character {
  protected animation: ImageBitmap[][] | null;
  protected spriteImage: string;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected animationState: number;
  protected scale: number;
  public messageChan = new MessageChannel();
  protected hitBox?: Matter.Body;
  protected characterCanvas: CanvasEnv;

  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    imgsrc: string,
    scale: number,
  ) {
    this.animationFrames = animationFrames;
    this.spriteImage = imgsrc;
    this.animation = null;
    this.animationState = 0;
    this.scale = scale;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.characterCanvas = new CanvasEnv(
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
    );
  }

  public setHitBox(
    xPos: number,
    yPos: number,
    xOffset: number,
    yOffset: number,
  ) {
    const hitBox = Bodies.rectangle(
      xPos,
      yPos,
      this.imgWidth - xOffset,
      this.imgHeight - yOffset,
      {
        render: {
          opacity: 0,
        },
        frictionAir: 0,
        label: "character",
      },
    );
    return hitBox;
  }

  //5 % 2 = 1
  //1 = 5 - 2*(5/2)
  public render() {
    if (this.hitBox === undefined) {
      return;
    }
    let animationTick = GameEnv.runAnimationTick();
    if (this.animation == null) {
      throw new Error("need to set animation first");
    }

    const modulo = getModulofromAnimation(
      animationTick,
      this.animation,
      this.animationState,
    );

    this.characterCanvas.ctx.clearRect(
      0,
      0,
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
    );

    this.characterCanvas.ctx.drawImage(
      this.animation[this.animationState][modulo],
      this.hitBox.position.x - this.imgWidth,
      this.hitBox.position.y - this.imgHeight - 2,
    );
    requestAnimationFrame(() => this.render());
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
}
