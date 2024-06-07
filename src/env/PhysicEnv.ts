import { Composite, Engine, Render, World } from "matter-js";
import CanvasEnv from "./CanvasEnv";

export default class PhysicEnv {
  public Engine: Engine;
  public World: World;
  public canvasEnv: CanvasEnv;
  public Render: Render;
  /**
   *
   */
  constructor(width: number, height: number) {
    this.Engine = Engine.create();
    this.World = this.Engine.world;
    this.canvasEnv = new CanvasEnv(width, height);
    this.Render = Render.create({
      canvas: this.canvasEnv.canvas,
      context: this.canvasEnv.ctx,
      engine: this.Engine,
      options: {
        background: "white",
        height: this.canvasEnv.canvas.height,
        width: this.canvasEnv.canvas.width,
        wireframes: true,
        showIds: true,
        pixelRatio: 1,
      },
    });
  }

  public addComponent(...components: Matter.Body[]) {
    Composite.add(this.World, components);
  }
}
