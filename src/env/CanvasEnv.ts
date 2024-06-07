export default class CanvasEnv {
  public canvas: HTMLCanvasElement;
  private static zindex: number = 0;

  public constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.setCanvasSize(width, height);
    this.setCanvasStyle();
    document.body.appendChild(this.canvas);
  }

  private setCanvasSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  private setCanvasStyle() {
    this.canvas.style.position = "absolute";
    this.canvas.style.left = "0";
    this.canvas.style.top = "0";
    this.canvas.style.zIndex = CanvasEnv.zindex.toString();
    CanvasEnv.zindex++;
  }
}
