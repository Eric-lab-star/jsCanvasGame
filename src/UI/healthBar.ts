import { Composite, Events } from "matter-js";
import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import HealthBarImgURL from "../res/healthbar.png";
import PhysicEnv from "../env/PhysicEnv";
export default class HealthBar {
  private canvasEnv: CanvasEnv;
  private bitMapImage: ImageBitmap | undefined;
  private pos: { x: number; y: number } = { x: 0, y: 0 };
  private width: number = 96;
  private maxHealth: number = 78;
  private deadEvent: Event;
  // private height: number = 17;

  constructor() {
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT, 14);
    this.hurtEventListener();
    this.deadEvent = new Event("dead");
  }

  public async loadImage() {
    const promise = new Promise((resolve) => {
      const image = new Image();
      image.src = HealthBarImgURL;
      image.onload = async () => {
        const bitMap = await createImageBitmap(image);

        this.bitMapImage = bitMap;
        resolve(true);
      };
    });
    return promise;
  }

  public render() {
    const player = Composite.allBodies(PhysicEnv.World).find((body) =>
      body.label === "hitBox"
    );

    const ctx = this.canvasEnv.getCtx();

    if (player !== undefined && this.bitMapImage !== undefined) {
      Events.on(
        PhysicEnv.Runner,
        "afterUpdate",
        () => this.renderHealthBar(player, ctx),
      );
    }
  }

  public renderHealthBar(player: Matter.Body, ctx: CanvasRenderingContext2D) {
    this.pos = {
      x: player.position.x - this.width / 2,
      y: player.position.y + 20,
    };
    ctx.reset();
    ctx.drawImage(this.bitMapImage as ImageBitmap, this.pos.x, this.pos.y);
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x + 16, this.pos.y + 8, this.maxHealth, 2);
  }

  public hurtEventListener() {
    addEventListener("hurt", () => {
      this.maxHealth -= 10;
      if (this.maxHealth <= 0) {
        this.maxHealth = 0;
        dispatchEvent(this.deadEvent);
        document.body.removeChild(this.canvasEnv.canvas);
      }
    });
  }
}
