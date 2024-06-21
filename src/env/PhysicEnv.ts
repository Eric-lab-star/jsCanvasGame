import Matter, { Engine, Render, Runner, World } from "matter-js";
import CanvasEnv from "./CanvasEnv";

export default class PhysicEnv {
  public static Engine: Engine = Engine.create();
  public static World: World = PhysicEnv.Engine.world;
  public canvasEnv: CanvasEnv;
  public Render: Render;
  /**
   *
   */
  constructor(width: number, height: number) {
    this.canvasEnv = new CanvasEnv(width, height);
    const ctx = this.canvasEnv.canvas.getContext("2d")!;
    this.Render = Render.create({
      canvas: this.canvasEnv.canvas,
      context: ctx,
      engine: PhysicEnv.Engine,
      options: {
        background: "transparent",
        height: this.canvasEnv.canvas.height,
        width: this.canvasEnv.canvas.width,
        wireframes: false,
        showIds: false,
        showAngleIndicator: false,
      },
    });
    this.run();
  }

  private run() {
    Matter.Render.run(this.Render);
    const runner = Runner.create();
    Matter.Runner.run(runner, PhysicEnv.Engine);
  }
}
