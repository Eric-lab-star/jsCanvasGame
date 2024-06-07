import GameEnv from "../env/GameEnv";
import tileAtlas from "../res/terrain.png";
import CanvasEnv from "../env/CanvasEnv";

export default class Level {
  private tileAtlasImage: HTMLImageElement;
  private mapJsonURL: string;
  public levelCanvas: CanvasEnv;

  constructor(mapJsonURL: string) {
    this.tileAtlasImage = new Image();
    this.mapJsonURL = mapJsonURL;
    this.levelCanvas = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
  }

  public render() {
    const levelWorker = new Worker(
      new URL("../workers/levelWorker.ts", import.meta.url),
      {
        type: "module",
      },
    );

    const offscreen = this.levelCanvas.canvas.transferControlToOffscreen();
    this.tileAtlasImage.src = tileAtlas;
    this.tileAtlasImage.addEventListener("load", async () => {
      const imageBitMap = await createImageBitmap(this.tileAtlasImage);

      levelWorker.postMessage(
        {
          canvas: offscreen,
          levelJsonURL: this.mapJsonURL,
          image: imageBitMap,
        },
        [offscreen, imageBitMap],
      );
    });
  }
}
