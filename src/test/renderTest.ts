import Captain from "../character/Capatain";
import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import Level from "../levels/level";
import levelJson from "../res/basic.json";
import { JsonTypes } from "../workers/levelConsumer";
import smallCloud1 from "../res/Small Cloud 1.png";
import smallCloud2 from "../res/Small Cloud 2.png";
import smallCloud3 from "../res/Small Cloud 3.png";
import level1 from "../res/level1.png";
import background from "../res/background.png";
import bigCloud from "../res/cloud.png";
import backPalmTree from "../res/backPalmtree.png";
import frontPalmTree from "../res/frontPalmtree.png";
import { modulo } from "../utilz/helper";

export default class RenderTest {
  private map: Level;
  private captain: Captain;

  public constructor() {
    this.map = new Level(levelJson as JsonTypes);
    this.captain = new Captain();
  }

  public center() {
    const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const ctx = canvas.canvas.getContext("2d")!;
    ctx.fillRect(GameEnv.GAME_WIDTH / 2, GameEnv.GAME_HEIGHT / 2, 4, 4);
  }

  public world() {
    this.background();
    this.smallCloudGenerator(10);
    this.bigCloud();
    this.backPalmTree();
    this.frontPalmTree();
    this.level1();
  }

  public smallCloudGenerator(amount: number) {
    const clouds = [smallCloud1, smallCloud2, smallCloud3];
    for (let i = 0; i < amount; i++) {
      let smallCloud = clouds[Math.floor(Math.random() * 3)];
      let yPos = Math.floor(Math.random() * 600);
      let xPos = Math.floor(Math.random() * 1280);
      this.smallCloud(xPos, yPos, smallCloud);
    }
  }

  public smallCloud(xPos: number, yPos: number, smallCloud: string) {
    const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const ctx = canvas.canvas.getContext("2d")!;
    const img = new Image();
    img.src = smallCloud;
    img.onload = () => {
      this.moveImage(GameEnv.GAME_WIDTH + xPos, yPos, img, ctx);
    };
  }

  public moveImage(
    xPos: number,
    yPos: number,
    img: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
  ) {
    ctx.reset();
    ctx.drawImage(img, xPos, yPos);
    xPos--;
    if (xPos < -400) {
      xPos = GameEnv.GAME_WIDTH + 10;
    }
    requestAnimationFrame(() => this.moveImage(xPos, yPos, img, ctx));
  }

  public frontPalmTree() {
    const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const ctx = canvas.canvas.getContext("2d")!;
    const img = new Image();
    img.src = frontPalmTree;
    img.onload = async () => {
      const sprite = await this.generatePalmTreeSprite(img);
      this.animatePalmTreeSprite(ctx, sprite);
    };
  }

  public async generatePalmTreeSprite(img: HTMLImageElement) {
    let imgs = [];
    for (let i = 0; i < 3; i++) {
      const bitMapImage = createImageBitmap(
        img,
        GameEnv.GAME_WIDTH * i,
        0,
        GameEnv.GAME_WIDTH,
        GameEnv.GAME_HEIGHT,
      );
      imgs.push(bitMapImage);
    }
    const resolved = Promise.all(imgs);
    return resolved;
  }

  public animatePalmTreeSprite(
    ctx: CanvasRenderingContext2D,
    sprite: ImageBitmap[],
    animationTick: number = 0,
  ) {
    let index = modulo(animationTick, sprite.length);
    index = Math.floor(index);

    ctx.drawImage(sprite[index], 0, 0);
    animationTick = animationTick + 0.3;
    requestAnimationFrame(() =>
      this.animatePalmTreeSprite(ctx, sprite, animationTick),
    );
  }

  public animatePalmTree(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    ctx.drawImage(img, 0, 0, 1280, 800);
    requestAnimationFrame(() => this.animatePalmTree(ctx, img));
  }
  public backPalmTree() {
    const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const ctx = canvas.canvas.getContext("2d")!;
    const img = new Image();
    img.src = backPalmTree;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }

  public background() {
    const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const ctx = canvas.canvas.getContext("2d")!;
    const img = new Image();
    img.src = background;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }

  public bigCloud() {
    const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const ctx = canvas.canvas.getContext("2d")!;
    const img = new Image();
    img.src = bigCloud;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
  public level1() {
    const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    const ctx = canvas.canvas.getContext("2d")!;
    const img = new Image();
    img.src = level1;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }

  // level specific test worker
  public start() {
    addEventListener("keydown", (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "r") {
        window.location.reload();
      }
    });
    this.world();
    // this.map.render();
    // this.captain.render();
  }
}
