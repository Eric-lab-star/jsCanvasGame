import { Bodies } from "matter-js";
import { moduloGenerator } from "./helper";

export default class TextureBodyRect {
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
    this.body = this.bodyBuilder(x, y, width, height, label, imgArray);
    this.staticImages = imgArray;
    this.animateBody();
  }

  private bodyBuilder(
    x: number,
    y: number,
    width: number,
    height: number,
    lable: string,
    imgArray: string[],
  ) {
    return Bodies.rectangle(x + width / 2, y + height / 2, width, height, {
      label: lable,
      render: {
        opacity: 1,
        sprite: {
          texture: imgArray[0],
          xScale: 2,
          yScale: 2,
        },
      },
    });
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
