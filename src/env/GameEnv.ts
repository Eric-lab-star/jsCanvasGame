export default class GameEnv {
  private static TILE_SIZE: number = 32;
  private static MAP_COLUMNS: number = 40;
  private static MAP_ROWS: number = 25;
  private static TILES_MAP_COLUMNS: number = 17;
  private static GAME_WIDTH: number = this.TILE_SIZE * this.MAP_COLUMNS;
  private static GAME_HEIGHT: number = this.TILE_SIZE * this.MAP_ROWS;
  private static TERRAIN_TILE: string = "./res/terrain.png";

  private static BASIC_LEVEL_JSON: string = "./res/basic.json";
  public getBasicLevelJson() {
    return GameEnv.BASIC_LEVEL_JSON;
  }

  private static ZINDEX: number = 0;
  private static animationSpeed: number = 10;
  public getAnimationSpeed() {
    return GameEnv.animationSpeed;
  }

  public runAnimationTick() {
    GameEnv.animationTick += 1 / GameEnv.animationSpeed;
    return Math.floor(GameEnv.animationTick);
  }
  private static animationTick: number = 0;
  public getAnimationTick() {
    return GameEnv.animationTick;
  }
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.initCanvas();
    this.ctx = this.ctxGetter(this.canvas);
  }

  public getTerrainTile() {
    return GameEnv.TERRAIN_TILE;
  }

  public getTileSize() {
    return GameEnv.TILE_SIZE;
  }

  public getGameHeight(): number {
    return GameEnv.GAME_HEIGHT;
  }
  public getGameWidth() {
    return GameEnv.GAME_WIDTH;
  }

  public getMapColumns() {
    return GameEnv.MAP_COLUMNS;
  }

  public getMapRows() {
    return GameEnv.MAP_ROWS;
  }

  public getTilesMapColumns() {
    return GameEnv.TILES_MAP_COLUMNS;
  }

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
