import Background from "../res/world/64px/Background.png";
import BigCloud from "../res/world/64px/BigCloud.png";
import BackTree from "../res/world/64px/BackTree.png";
import FrontTree from "../res/world/64px/FrontTree.png";
import SmallCloud from "../res/world/64px/SmallCloud.png";
import Terrain from "../res/world/64px/Terrain.png";
import GameObjects from "../res/world/64px/GameObjects.png";

import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import Animation from "../animation/animation";
import { moduloGenerator } from "../utilz/helper";

export default class World {
  private static loadedImageMap = new Map();
  public constructor() {}
  public static imageAssets = [
    Background,
    SmallCloud,
    BackTree,
    FrontTree,
    GameObjects,
    Terrain,
  ];

  public static async assetPreloader() {
    const promises: Promise<boolean>[] = [];
    for (let i = 0; i < World.imageAssets.length; i++) {
      const promise = new Promise((resolve) => {
        const img = new Image();
        img.src = World.imageAssets[i];
        img.onload = () => {
          World.loadedImageMap.set(World.imageAssets[i], img);
          resolve(true);
        };
      });
      promises.push(promise as Promise<boolean>);
    }
    await Promise.all(promises);
  }
  private animationSet: ImageBitmap[][] | undefined;

  private bigCloudLoader() {
    const img = new Image();
    img.src = BigCloud;
    img.onload = async () => {
      const bitmap = await createImageBitmap(img);
      const animation = new Animation(bitmap, [42], 1280, 800);
      const animationSet = await Promise.all(animation.loadAnimationSets());
      this.animationSet = animationSet;
      const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT, 0);
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
    this.bigCloudLoader();
    for (const image of World.loadedImageMap.values()) {
      const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
      const ctx = canvas.getCtx();
      ctx.drawImage(image, 0, 0);
    }
    // this.bigCloudAnimationRender();
  }
}
