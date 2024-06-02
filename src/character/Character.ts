import Matter, { Body } from "matter-js";
import Animation from "../animation/animation";
import GameEnv from "../env/GameEnv";
import Vector2d from "../utilz/Vector2d";
import { getModulofromAnimation } from "../utilz/getUrl";

const { Bodies } = Matter;

export default class Character extends GameEnv {
  protected pos: Vector2d;
  public speed: number;
  protected animation: ImageBitmap[][] | null;
  protected spriteImage: string;
  protected animationFrames: number[];
  protected imgWidth: number;
  protected imgHeight: number;
  protected animationState: number;
  protected scale: number;
  public messageChan = new MessageChannel();
  protected hitBox?: Matter.Body;

  constructor(
    imgWidth: number,
    imgHeight: number,
    animationFrames: number[],
    imgsrc: string,
    scale: number,
  ) {
    super();
    this.pos = new Vector2d(100, 100);
    this.speed = 5;
    this.animationFrames = animationFrames;
    this.spriteImage = imgsrc;
    this.animation = null;
    this.animationState = 0;
    this.scale = scale;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
  }

  public render() {
    this.drawAnimation();
  }

  public setHitBox() {
    const hitBox = Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.imgWidth,
      this.imgHeight,
    );

    this.addComponent(hitBox);
    return hitBox;
  }

  //5 % 2 = 1
  //1 = 5 - 2*(5/2)
  public drawAnimation() {
    if (this.hitBox === undefined) {
      return;
    }
    let animationTick = this.runAnimationTick();
    if (this.animation == null) {
      throw new Error("need to set animation first");
    }

    const modulo = getModulofromAnimation(
      animationTick,
      this.animation,
      this.animationState,
    );

    this.ctx.strokeStyle = "blue";
    this.ctx.clearRect(
      this.hitBox.position.x - this.imgWidth * 1.5,
      this.hitBox.position.y - this.imgHeight * 1.5,
      this.imgWidth * this.scale * 1.5,
      this.imgHeight * this.scale * 1.5,
    );

    this.ctx.strokeStyle = "red";

    this.ctx.strokeRect(
      this.hitBox.position.x - this.imgWidth / 2,
      this.hitBox.position.y - this.imgHeight / 2,
      this.imgWidth,
      this.imgHeight,
    );

    this.ctx.drawImage(
      this.animation[this.animationState][modulo],
      this.hitBox.position.x - this.imgWidth,
      this.hitBox.position.y - this.imgHeight,
    );
    requestAnimationFrame(() => this.drawAnimation());
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

  public update(x: number, y: number) {
    this.pos.update(x, y);
  }

  public setSpeed(s: number) {
    this.speed = s;
  }
}
