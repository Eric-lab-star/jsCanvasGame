/**
 * Vector2d holds position on canvas
 * */
class Vector2d {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public update(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}

export default Vector2d;
