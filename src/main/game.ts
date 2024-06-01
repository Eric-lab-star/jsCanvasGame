import Matter, { Render, Runner } from "matter-js";
import Captain from "../character/Capatain";
import GameEnv from "../env/GameEnv";
import Level from "../levels/level";
import { getURL } from "../utilz/getUrl";

const { Bodies } = Matter;

export default class Game extends GameEnv {
  private map: Level;
  private captain: Captain;
  public constructor() {
    super();
    this.map = new Level(getURL("../res/basic.json"));
    this.captain = new Captain();
  }

  public run() {
    Render.run(this.renderMatter);
    const runner = Matter.Runner.create();
    Runner.run(runner, Game.Engine);
  }

  private initGameScene() {
    const box = Bodies.rectangle(400, 20, 80, 80);
    const ground = Bodies.rectangle(
      this.getGameWidth() / 2,
      this.getGameHeight(),
      this.getGameWidth(),
      40,
      {
        isStatic: true,
        render: {
          opacity: 0,
        },
      },
    );
    const leftWall = Bodies.rectangle(
      0,
      this.getGameHeight() / 2,
      40,
      this.getGameHeight(),
      {
        isStatic: true,
        render: {
          opacity: 0,
        },
      },
    );
    const rightWall = Bodies.rectangle(
      this.getGameWidth(),
      this.getGameHeight() / 2,
      40,
      this.getGameHeight(),
      {
        isStatic: true,
        render: {
          opacity: 0,
        },
      },
    );

    this.addComponent(leftWall, rightWall, ground, box);
  }

  public preload() {
    this.map.resolveImages();
    this.captain.setAnimation();
  }

  public render() {
    this.map.messageChan.port2.onmessage = () => {
      this.captain.messageChan.port2.onmessage = () => {
        this.handleClick();
        // addEventListener("click", () => {
        //   this.handleClick();
        // });
      };
    };
  }

  public handleClick() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.render();
    this.captain.render();
  }

  public start() {
    this.initGameScene();
    this.map.addMatter();
    // this.preload();
    // this.render();
    this.run();
  }

  public centerText(title: string, offsetW: number = 0, offsetH: number = 0) {
    const offcanvas = document.createElement("canvas");
    document.body.appendChild(offcanvas);
    offcanvas.width = this.getGameWidth();
    offcanvas.height = this.getGameHeight();
    const ctx = offcanvas.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.font = "40px Fantasy";
    const titleLen = ctx.measureText(title);
    ctx.fillText(
      title,
      (this.getGameWidth() - titleLen.width) / 2 + offsetW,
      this.getGameHeight() / 2 + offsetH,
    );
  }
}
