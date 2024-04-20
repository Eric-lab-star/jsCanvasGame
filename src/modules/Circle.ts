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

  public update(x: number, y: number) {
    this.setX(x);
    this.setY(y);
    this.draw();
  }

  public setX(delta: number) {
    this.x += delta;
  }

  public setY(delta: number) {
    this.y += delta;
  }
}

export default Circle;
