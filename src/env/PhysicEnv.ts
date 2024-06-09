import Matter, { Composite, Engine, Render, Runner, World } from "matter-js";
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
    const ctx = this.canvasEnv.canvas.getContext("2d")!;
    this.Render = Render.create({
      canvas: this.canvasEnv.canvas,
      context: ctx,
      engine: this.Engine,
      options: {
        background: "transparent",
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

  public run() {
    Matter.Render.run(this.Render);
    const runner = Runner.create();
    Matter.Runner.run(runner, this.Engine);
  }
}
