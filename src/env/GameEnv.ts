import Matter from "matter-js";

//@ts-ignore
import polyDecomp from "poly-decomp";
import TileMapProps from "../main/tileMap";

const { Bodies, Engine, Render, Composite, Common } = Matter;

export default class GameEnv {
  protected static tileMapProps = new TileMapProps();
  private static GAME_WIDTH: number =
    this.tileMapProps.getTileSize() * this.tileMapProps.getMapColumns();
  public getGameWidth() {
    return GameEnv.GAME_WIDTH;
  }

  private static GAME_HEIGHT: number =
    this.tileMapProps.getTileSize() * this.tileMapProps.getMapRows();

  public getGameHeight(): number {
    return GameEnv.GAME_HEIGHT;
  }

  public renderMatter: Matter.Render;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.initCanvas();
    this.ctx = this.ctxGetter(this.canvas);
    this.renderMatter = Render.create({
      canvas: this.canvas,
      context: this.ctx,
      engine: GameEnv.Engine,
      options: {
        background: "white",
        height: GameEnv.GAME_HEIGHT,
        width: GameEnv.GAME_WIDTH,
        wireframes: false,
      },
    });
    Common.setDecomp(polyDecomp);
  }

  protected static Engine = Engine.create();
  protected static World = GameEnv.Engine.world;

  protected addComponent(...components: Matter.Body[]) {
    Composite.add(GameEnv.World, components);
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
    GameEnv.animationTick += increment;
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
