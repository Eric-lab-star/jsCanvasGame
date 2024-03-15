import { Storage } from "./Utilz.js";

class Circle {
  protected ctx: CanvasRenderingContext2D;
  protected x: number;
  protected y: number;
  protected radius: number;
  protected color: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string,
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  public update() {
    console.log(Storage.storage["canvasWidth"]);
    console.log(innerWidth);

    this.ctx.clearRect(
      0,
      0,
      Storage.get("canvasWidth"),
      Storage.get("canvasHeight"),
    );
    this.draw();
  }

  public setX(delta: number) {
    this.x += delta;
  }

  public moveRight() {
    this.x += 100 / 1000;
  }

  public setY(delta: number) {
    this.y += delta;
  }
}

export { Circle };
