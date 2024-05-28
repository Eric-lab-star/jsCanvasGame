import GameEnv from "../env/GameEnv";

export default class Level extends GameEnv {
  public resolvedImages: ImageBitmap[] = [];

  constructor() {
    super();
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
    image.src = this.getTerrainTile();
    image.addEventListener("load", async () => {
      const images = await this.createBitImageSet(image);
      this.resolvedImages = await Promise.all(images);
      this.render();
      console.log("Image loaded");
    });
  }

  public async createBitImageSet(image: HTMLImageElement) {
    const images: Promise<ImageBitmap>[] = [];
    const data = await this.getData();
    this.tileLoop((x: number, y: number) => {
      const id = data[y * this.getMapColumns() + x] - 1;
      const ty = Math.floor(id / this.getTilesMapColumns());
      const tx = id - ty * this.getTilesMapColumns();
      const bitImg = this.createImageBitMap(image, ty, tx);
      images.push(bitImg);
    });
    return images;
  }
  public async getData() {
    const res = await fetch(this.getBasicLevelJson());
    const json: JsonTypes = await res.json();
    return json.layers[0].data;
  }

  public createImageBitMap(image: HTMLImageElement, ty: number, tx: number) {
    const tilesize = this.getTileSize();
    return createImageBitmap(
      image,
      tilesize * tx,
      tilesize * ty,
      tilesize,
      tilesize,
    );
  }

  public render() {
    const tilesize = this.getTileSize();
    const mapColumns = this.getMapColumns();
    this.tileLoop((x, y) => {
      this.ctx.drawImage(
        this.resolvedImages[y * mapColumns + x],
        x * tilesize,
        y * tilesize,
      );
    });
  }

  public tileLoop(callback: (x: number, y: number) => void) {
    for (let y = 0; y < this.getMapRows(); y++) {
      for (let x = 0; x < this.getMapColumns(); x++) {
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
