import Background from "../res/world/64px/Background.png";
import BackTree from "../res/world/64px/BackTree.png";
import FrontTree from "../res/world/64px/FrontTree.png";
import SmallCloud from "../res/world/64px/SmallCloud.png";
import Terrain from "../res/world/64px/Terrain.png";
import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";

export default class World {
  private canvasList: CanvasEnv[] = [];
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

  public renderImages() {
    for (const image of World.HTMLImageElements.values()) {
      const canvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
      this.canvasList.push(canvas);
      const ctx = canvas.getCtx();
      ctx.drawImage(image, 0, 0);
    }
  }

  public gameOver() {
    this.canvasList.forEach((canvas) => {
      canvas.remove();
    });
  }
}
