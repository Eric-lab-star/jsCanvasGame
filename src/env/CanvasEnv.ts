export default class CanvasEnv {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private static zindex: number = 0;

  public constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.setCanvasSize(width, height);
    document.body.appendChild(this.canvas);
  }

  public setCanvasSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public setCanvasStyle() {
    this.canvas.style.position = "absolute";
    this.canvas.style.left = "0";
    this.canvas.style.top = "0";
    this.canvas.style.zIndex = CanvasEnv.zindex.toString();
    CanvasEnv.zindex++;
    console.log(CanvasEnv.zindex);
  }
}
