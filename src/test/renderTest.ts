import CanvasEnv from "../env/CanvasEnv";
import World from "../levels/world";
import TerrainAtlas from "../res/TerrainAtlas.png";
import tileMapjson from "../res/largeMap.json";
export default class RenderTest {
  private bitMapImages: ImageBitmap[] = [];
  private map: HTMLCanvasElement;

  public constructor() {
    this.map = document.createElement("canvas");
  }

  // level specific test worker
  public async start() {
    let xPos = 0;
    let yPos = 0;

    this.map.width = 800;
    this.map.height = 800;
    document.body.appendChild(this.map);
    this.bitMapImages = await this.parseAtlas();
    console.log(this.bitMapImages.length);
    const fulllMap = await this.fullMap();
    this.lookat(fulllMap, 500, 0);
    addEventListener("keydown", (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "r") {
        window.location.reload();
      }
      if (e.key === "d") {
        xPos += 10;
        this.lookat(fulllMap, xPos, yPos);
      }
    });
  }

  private lookat(canvas: HTMLCanvasElement, x: number = 0, y: number = 0) {
    const ctx = this.map.getContext("2d");
    if (ctx === null) {
      throw new Error("ctx is not supported");
    }
    const width = 800;
    const heigth = 800;
    ctx.reset();
    ctx.drawImage(canvas, 0 + x, 0 + y, 800, 800, 0, 0, 800, 800);
  }

  private async fullMap() {
    const canvas = document.createElement("canvas");
    const data = tileMapjson.layers[0].data;
    const height = tileMapjson.height;
    const width = tileMapjson.width;
    const tileHeight = tileMapjson.tileheight;
    const tileWidth = tileMapjson.tilewidth;
    canvas.width = width * tileWidth;
    canvas.height = height * tileHeight;
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.zIndex = "1";
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("ctx is not supported");
    }

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        const imageIndex = data[w + width * h];
        if (imageIndex === 0) {
          continue;
        }

        ctx.drawImage(
          this.bitMapImages[data[w + width * h] - 1],
          w * tileWidth,
          tileHeight * h,
        );
      }
    }
    return canvas;
  }

  private parseAtlas() {
    const promise = new Promise<ImageBitmap[]>((resolve) => {
      const bitMapImages: ImageBitmap[] = [];
      const image = new Image();
      image.src = TerrainAtlas;
      image.onload = async () => {
        for (let j = 0; j < 5; j++) {
          for (let i = 0; i < 17; i++) {
            const bitMapImage = await createImageBitmap(
              image,
              i * 32,
              j * 32,
              32,
              32,
            );
            bitMapImages.push(bitMapImage);
          }
        }
        resolve(bitMapImages);
      };
    });
    return promise;
  }
}
