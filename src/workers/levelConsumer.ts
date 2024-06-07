// level consumer is responsible for rendering the level on worker thread
import TileMapProps from "../main/tileMap";
export default class LevelConsumer {
  public resolvedImages: ImageBitmap[];
  private mapJsonURL: string;
  public levelCanvas: OffscreenCanvas;
  public image: ImageBitmap;

  constructor(canvas: OffscreenCanvas, mapJsonURL: string, image: ImageBitmap) {
    this.levelCanvas = canvas;
    this.mapJsonURL = mapJsonURL;
    this.image = image;
    this.resolvedImages = [];
  }

  /**
   * render image on canvas
   * */
  public render() {
    const ctx = this.levelCanvas.getContext("2d");
    if (ctx === null) {
      console.log("context is null");
      return;
    }
    const tilesize = TileMapProps.TILE_SIZE;
    const mapColumns = TileMapProps.MAP_COLUMNS;

    this.tileLoop((col, row) => {
      ctx.drawImage(
        this.resolvedImages[row * mapColumns + col],
        col * tilesize,
        row * tilesize,
      );
    });
  }

  /**
   * Asynchronously resolves images for the level.
   *
   * This method first creates a set of bit images using the `createBitImageSet` method.
   * It then resolves all of these images and stores them in the `resolvedImages` property.
   *
   */
  public async resolveImages() {
    const images = await this.createBitImageSet();
    this.resolvedImages = await Promise.all(images);
  }

  /**
   * create bitmap image sets using json data
   * */
  private async createBitImageSet() {
    const images: Promise<ImageBitmap>[] = [];
    const data = await this.getData();
    this.tileLoop((x: number, y: number) => {
      const id = data[y * TileMapProps.MAP_COLUMNS + x] - 1;
      const ty = Math.floor(id / TileMapProps.TILES_MAP_COLUMNS);
      const tx = id - ty * TileMapProps.TILES_MAP_COLUMNS;
      const bitImg = this.cropTileAtlasImage(ty, tx);
      images.push(bitImg);
    });
    return images;
  }

  /**
   * get data from json file
   * */
  private async getData() {
    const res = await fetch(this.mapJsonURL);
    const json: JsonTypes = await res.json();
    return json.layers[0].data;
  }

  /**
   * crop tile atlas image
   * */
  private cropTileAtlasImage(ty: number, tx: number) {
    const tilesize = TileMapProps.TILE_SIZE;
    const opt: ImageBitmapOptions = {
      resizeQuality: "pixelated",
    };

    const tileImage = this.image;

    return createImageBitmap(
      tileImage,
      tilesize * tx,
      tilesize * ty,
      tilesize,
      tilesize,
      opt,
    );
  }

  /**
   * utility function to loop over data
   * */
  private tileLoop(callback: (col: number, row: number) => void) {
    for (let row = 0; row < TileMapProps.MAP_ROWS; row++) {
      for (let col = 0; col < TileMapProps.MAP_COLUMNS; col++) {
        try {
          callback(col, row);
        } catch (e) {
          console.trace(
            `could not execute callback on\n col: ${col}, row: ${row}`,
          );
          return;
        }
      }
    }
  }
}

interface JsonTypes {
  compressionlevel: -1;
  height: 25;
  infinite: false;
  layers: [
    {
      data: number[];
      height: 25;
      id: 1;
      name: "Tile Layer 1";
      opacity: 1;
      type: "tilelayer";
      visible: true;
      width: 40;
      x: 0;
      y: 0;
    },
  ];
  nextlayerid: 2;
  nextobjectid: 1;
  orientation: "orthogonal";
  renderorder: "right-down";
  tiledversion: "1.10.2";
  tileheight: 32;
  tilesets: [
    {
      firstgid: 1;
      source: "terrain.tsx";
    },
  ];
  tilewidth: 32;
  type: "map";
  version: "1.10";
  width: 40;
}
