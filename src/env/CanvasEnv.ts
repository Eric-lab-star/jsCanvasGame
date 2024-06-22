export default class CanvasEnv {
  public canvas: HTMLCanvasElement;
  private static zindex: number = 0;
  private customZindex?: number;
  public id: string;

  public constructor(
    width: number,
    height: number,
    zindex?: number,
    id: string = "canvas",
  ) {
    this.id = id;
    this.canvas = document.createElement("canvas");
    this.customZindex = zindex;
    this.setCanvasSize(width, height);
    this.setCanvasStyle(width, 0);
    document.body.appendChild(this.canvas);
  }

  private setCanvasSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  private setCanvasStyle(width: number, height: number) {
    const left = (window.innerWidth - width) / 2;
    this.canvas.style.position = "absolute";
    this.canvas.style.left = left + "px";
    this.canvas.style.top = height + "px";
    this.canvas.style.zIndex =
      this.customZindex === undefined
        ? CanvasEnv.zindex.toString()
        : this.customZindex.toString();
    CanvasEnv.zindex++;
  }
  public getCtx() {
    let ctx = this.canvas.getContext("2d");
    if (ctx == null) {
      throw new Error("Canvas context is null");
    }
    return ctx;
  }
  public removeCanvas() {
    this.canvas.remove();
  }
  public toggleCanvas() {
    this.canvas.style.display =
      this.canvas.style.display === "none" ? "block" : "none";
  }
}
