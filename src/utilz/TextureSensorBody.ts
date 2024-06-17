import { Bodies } from "matter-js";
import { moduloGenerator } from "./helper";

export default class TextureSensorBody {
  public body: Matter.Body;

  private staticImages: string[];
  constructor(
    label: string,
    imgArray: string[] = [],
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.body = Bodies.rectangle(x + width / 2, y + height / 2, width, height, {
      isSensor: true,
      isStatic: true,
      label: label,
      render: {
        opacity: 1,
        sprite: {
          texture: imgArray[0],
          xScale: 2,
          yScale: 2,
        },
      },
    });
    this.staticImages = imgArray;
    this.animateBody();
  }
  private tick = 0;
  private tickSpeed = 1 / 10;
  private runAnimationTick() {
    this.tick += this.tickSpeed;
  }
  private animateBody() {
    this.runAnimationTick();
    const modulo = moduloGenerator(
      Math.floor(this.tick),
      this.staticImages.length,
    );
    this.body.render.sprite!.texture = this.staticImages[modulo];
    requestAnimationFrame(() => this.animateBody());
  }
}
