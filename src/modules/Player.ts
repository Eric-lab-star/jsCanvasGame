class Player {
  private ct: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private radius: number;
  private color: string;

  constructor(
    ct: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string,
  ) {
    this.ct = ct;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    this.ct.beginPath();
    this.ct.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ct.fillStyle = this.color;
    this.ct.fill();
  }
}

export default Player;
