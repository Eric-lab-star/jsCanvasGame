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
  // private height: number = 17;

  constructor() {
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT, 14);
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
      Events.on(PhysicEnv.Runner, "afterUpdate", () => {
        this.pos = {
          x: player.position.x - this.width / 2,
          y: player.position.y + 20,
        };
        ctx.reset();
        ctx.drawImage(this.bitMapImage as ImageBitmap, this.pos.x, this.pos.y);
      });
    }
  }
}
