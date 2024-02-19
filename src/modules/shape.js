class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  position() {
    return { x: this.x, y: this.y };
  }
}

export default Shape;
