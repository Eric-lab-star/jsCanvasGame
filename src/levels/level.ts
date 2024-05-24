import GameEnv from "../env/GameEnv";

export default class Level {
  private ctx: CanvasRenderingContext2D;
  public resolvedImages: ImageBitmap[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public handleMap() {
    if (this.resolvedImages.length === 0) {
      this.initImage();
    } else {
      this.render();
    }
  }

  public initImage() {
    const image = new Image();
    image.src = GameEnv.TERRAIN_TILE;
    image.addEventListener("load", async () => {
      const images = await this.createBitImageSet(image);
      this.resolvedImages = await Promise.all(images);
      this.render();
    });
  }

  public async createBitImageSet(image: HTMLImageElement) {
    const images: Promise<ImageBitmap>[] = [];
    const data = await this.getData();
    this.tileLoop((x: number, y: number) => {
      const id = data[y * GameEnv.MAP_COLUMNS + x] - 1;
      const ty = Math.floor(id / GameEnv.TILES_MAP_COLUMNS);
      const tx = id - ty * GameEnv.TILES_MAP_COLUMNS;
      const bitImg = this.createImageBitMap(image, ty, tx);
      images.push(bitImg);
    });
    return images;
  }
  public async getData() {
    const res = await fetch(GameEnv.BASIC_LEVEL_JSON);
    const json: JsonTypes = await res.json();
    return json.layers[0].data;
  }

  public createImageBitMap(image: HTMLImageElement, ty: number, tx: number) {
    return createImageBitmap(
      image,
      GameEnv.TILE_SIZE * tx,
      GameEnv.TILE_SIZE * ty,
      GameEnv.TILE_SIZE,
      GameEnv.TILE_SIZE,
    );
  }

  public render() {
    this.tileLoop((x, y) => {
      this.ctx.drawImage(
        this.resolvedImages[y * GameEnv.MAP_COLUMNS + x],
        x * GameEnv.TILE_SIZE,
        y * GameEnv.TILE_SIZE,
      );
    });
  }

  public tileLoop(callback: (x: number, y: number) => void) {
    for (let y = 0; y < GameEnv.MAP_ROWS; y++) {
      for (let x = 0; x < GameEnv.MAP_COLUMNS; x++) {
        callback(x, y);
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
