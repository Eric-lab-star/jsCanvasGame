import GameEnv from "../env/GameEnv";

export default class Level extends GameEnv {
  public resolvedImages: ImageBitmap[] = [];
  private tileAtlasImage: HTMLImageElement;

  constructor() {
    super();
    this.tileAtlasImage = new Image();
  }

  /**
   * paint level on screen when resolvedImages event is fired from resolveImages function
   * */
  public render() {
    this.canvas.addEventListener("resolvedImages", () => {
      const tilesize = this.getTileSize();
      const mapColumns = this.getMapColumns();
      this.tileLoop((col, row) => {
        this.ctx.drawImage(
          this.resolvedImages[row * mapColumns + col],
          col * tilesize,
          row * tilesize,
        );
      });
    });
  }

  /**
   * resolveImages function calls createBitImageSet function to assign bitmap images to resolvedImages.
   * after resolving bitmap images, this.canvas fires resolvedImages event
   *
   * */
  public resolveImages() {
    const resolvedImagesEvent = new Event("resolvedImages", { bubbles: true });
    this.tileAtlasImage.src = this.getTerrainTile();
    this.tileAtlasImage.addEventListener(
      "load",
      async () => {
        const images = await this.createBitImageSet();
        this.resolvedImages = await Promise.all(images);
        this.canvas.dispatchEvent(resolvedImagesEvent);
      },
      { once: true },
    );
  }

  public async createBitImageSet() {
    const images: Promise<ImageBitmap>[] = [];
    const data = await this.getData();
    this.tileLoop((x: number, y: number) => {
      const id = data[y * this.getMapColumns() + x] - 1;
      const ty = Math.floor(id / this.getTilesMapColumns());
      const tx = id - ty * this.getTilesMapColumns();
      const bitImg = this.cropTileAtlasImage(ty, tx);
      images.push(bitImg);
    });
    return images;
  }

  public async getData() {
    const res = await fetch(this.getBasicLevelJson());
    const json: JsonTypes = await res.json();
    return json.layers[0].data;
  }

  private cropTileAtlasImage(ty: number, tx: number) {
    const tilesize = this.getTileSize();
    const opt: ImageBitmapOptions = {
      resizeQuality: "pixelated",
    };

    const tileImage = this.tileAtlasImage;

    if (tileImage.src == "") {
      throw new Error("tile image source is undefined");
    }

    return createImageBitmap(
      tileImage,
      tilesize * tx,
      tilesize * ty,
      tilesize,
      tilesize,
      opt,
    );
  }

  public tileLoop(callback: (col: number, row: number) => void) {
    for (let row = 0; row < this.getMapRows(); row++) {
      for (let col = 0; col < this.getMapColumns(); col++) {
        callback(col, row);
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
