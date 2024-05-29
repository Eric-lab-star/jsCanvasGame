export default class GameEnv {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.initCanvas();
    this.ctx = this.ctxGetter(this.canvas);
  }

  private static TILE_SIZE: number = 32;
  public getTileSize() {
    return GameEnv.TILE_SIZE;
  }

  private static MAP_COLUMNS: number = 40;
  public getMapColumns() {
    return GameEnv.MAP_COLUMNS;
  }

  private static MAP_ROWS: number = 25;
  public getMapRows() {
    return GameEnv.MAP_ROWS;
  }

  private static TILES_MAP_COLUMNS: number = 17;
  public getTilesMapColumns() {
    return GameEnv.TILES_MAP_COLUMNS;
  }

  private static GAME_WIDTH: number = this.TILE_SIZE * this.MAP_COLUMNS;
  public getGameWidth() {
    return GameEnv.GAME_WIDTH;
  }

  private static GAME_HEIGHT: number = this.TILE_SIZE * this.MAP_ROWS;
  public getGameHeight(): number {
    return GameEnv.GAME_HEIGHT;
  }

  private static ZINDEX: number = 0;
  private static animationSpeed: number = 10;
  public getAnimationSpeed() {
    return GameEnv.animationSpeed;
  }

  private static animationTick: number = 0;
  public getAnimationTick() {
    return GameEnv.animationTick;
  }
  public setAnimationTick(increment: number) {
    GameEnv.animationTick += 1 / GameEnv.animationSpeed;
  }

  public runAnimationTick() {
    GameEnv.animationTick += 1 / GameEnv.animationSpeed;
    return Math.floor(GameEnv.animationTick);
  }

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public initCanvas() {
    this.setCanvasWidthHeight();
    this.setCanvasStyle();
    document.body.appendChild(this.canvas);
    return this.canvas;
  }

  protected setCanvasWidthHeight() {
    this.canvas.width = this.getGameWidth();
    this.canvas.height = this.getGameHeight();
  }

  protected setCanvasStyle() {
    this.canvas.style.position = "absolute";
    this.canvas.style.left = "0";
    this.canvas.style.top = "0";
    this.canvas.style.zIndex = GameEnv.ZINDEX.toString();
    GameEnv.ZINDEX++;
  }

  public ctxGetter(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (ctx == null) {
      throw new Error("canvas api is not supported");
    }
    return ctx;
  }
}
