import Background from "../res/world/64px/Background.png";
import BigCloud from "../res/world/64px/BigCloud.png";
import BackTree from "../res/world/64px/BackTree.png";
import FrontTree from "../res/world/64px/FrontTree.png";
import SmallCloud from "../res/world/64px/SmallCloud.png";
import Terrain from "../res/world/64px/Terrain.png";
import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import Animation from "../animation/animation";
import { moduloGenerator } from "../utilz/helper";

export default class World {
  public constructor() {}
  public static imageAssets = [
    Background,
    SmallCloud,
    BackTree,
    FrontTree,
    Terrain,
  ];
  public static HTMLImageElements = new Map([
    [Background, new Image()],
    [SmallCloud, new Image()],
    [BackTree, new Image()],
    [FrontTree, new Image()],
    [Terrain, new Image()],
  ]);

  public static async assetPreloader() {
    const promises: Promise<boolean>[] = [];
    for (const imgSrc of World.HTMLImageElements.keys()) {
      const promise = new Promise((resolve) => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
          World.HTMLImageElements.set(imgSrc, img);
          resolve(true);
        };
      });
      promises.push(promise as Promise<boolean>);
    }
    await Promise.all(promises);
  }
  private animationSet: ImageBitmap[][] | undefined;

  // TODO: optimize image size
  private bigCloudLoader() {
    const img = new Image();
    img.src = BigCloud;
    img.onload = async () => {
      const bitmap = await createImageBitmap(img);
      const animation = new Animation(bitmap, [42], 1280, 800);
      const animationSet = await Promise.all(animation.loadAnimationSets());
      this.animationSet = animationSet;
      const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT, 1);
      const ctx = canvas.getCtx();
      this.bigCloudAnimationRender(ctx);
    };
  }

  private bigCloudAnimationRender(ctx: CanvasRenderingContext2D) {
    const modulo = moduloGenerator(GameEnv.runAnimationTick(), 42);
    ctx.reset();
    ctx.drawImage(this.animationSet![0][modulo], 0, 0);
    requestAnimationFrame(() => this.bigCloudAnimationRender(ctx));
  }

  public render() {
    // this.bigCloudLoader();
    for (const image of World.HTMLImageElements.values()) {
      const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
      const ctx = canvas.getCtx();
      ctx.drawImage(image, 0, 0);
    }
  }
}
