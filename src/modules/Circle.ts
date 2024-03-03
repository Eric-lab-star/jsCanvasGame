interface circleProps {
  x: number;
  y: number;
  radius: number;
  color: string;
}

class Circle {
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private radius: number;
  private color: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    { x, y, radius, color }: circleProps,
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
}

export { Circle, circleProps };
