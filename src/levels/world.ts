import Background from "../res/world/64px/Background.png";
import BigCloud from "../res/world/64px/BigCloud.png";
import BackTree from "../res/world/64px/BackTree.png";
import FrontTree from "../res/world/64px/FrontTree.png";
import SmallCloud from "../res/world/64px/SmallCloud.png";
import Terrain from "../res/world/64px/Terrain.png";
import GameObjects from "../res/world/64px/GameObjects.png";

import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";

export default class World {
  private static loadedImageMap = new Map();
  public constructor() {}
  public static imageAssets = [
    Background,
    SmallCloud,
    BigCloud,
    BackTree,
    FrontTree,
    Terrain,
    GameObjects,
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

  public render() {
    for (const image of World.loadedImageMap.values()) {
      const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
      const ctx = canvas.getCtx();
      ctx.drawImage(image, 0, 0);
    }
  }
}
