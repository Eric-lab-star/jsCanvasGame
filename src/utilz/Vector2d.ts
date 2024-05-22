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
  public static normalize(vector: Vector2d) {
    const scalar = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    const normal = new Vector2d(vector.x / scalar, vector.y / scalar);
    return normal;
  }
}

export default Vector2d;
