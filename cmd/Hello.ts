export default class Player {
  private shape: string;
  private name: string;
  private width: number;
  private height: number;
  /**
   *
   */
  constructor(shape: string, name: string, width: number, height: number) {
    this.shape = shape;
    this.name = name;
    this.width = width;
    this.height = height;
  }

  print() {}
}
