export default class CanvasEnv {
  public canvas: HTMLCanvasElement;
  private static zindex: number = 0;

  public constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.setCanvasSize(width, height);
    this.setCanvasStyle(width, height);
    document.body.appendChild(this.canvas);
  }

  private setCanvasSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  private setCanvasStyle(width: number, height: number) {
    const left = (window.innerWidth - width) / 2;
    const top = height / 2;
    this.canvas.style.position = "absolute";
    this.canvas.style.left = left + "px";
    this.canvas.style.top = height + "px";
    this.canvas.style.zIndex = CanvasEnv.zindex.toString();
    CanvasEnv.zindex++;
  }
  public getCtx() {
    let ctx = this.canvas.getContext("2d");
    if (ctx == null) {
      throw new Error("Canvas context is null");
    }
    return ctx;
  }
}
