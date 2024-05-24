export default class Level {
  private ctx: CanvasRenderingContext2D;
  public resolvedImages: ImageBitmap[] = [];
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public initImage() {
    const image = new Image();
    image.src = "../../res/terrain.png";
    image.addEventListener("load", async () => {
      const images = await this.createBitImageSet(image);
      this.resolvedImages = await Promise.all(images);
    });
  }

  public render() {
    for (let y = 0; y < 25; y++) {
      for (let x = 0; x < 40; x++) {
        this.ctx.drawImage(this.resolvedImages[y * 40 + x], x * 32, y * 32);
      }
    }
  }

  public createImageBitMap(image: HTMLImageElement, ty: number, tx: number) {
    return createImageBitmap(image, 32 * tx, 32 * ty, 32, 32);
  }

  public async createBitImageSet(image: HTMLImageElement) {
    const images: Promise<ImageBitmap>[] = [];
    const data = await this.getData();
    for (let y = 0; y < 25; y++) {
      for (let x = 0; x < 40; x++) {
        const id = data[y * 40 + x] - 1;
        const ty = Math.floor(id / 17);
        const tx = id - ty * 17;
        const bitImg = this.createImageBitMap(image, ty, tx);
        images.push(bitImg);
      }
    }
    return images;
  }
  public async getData() {
    const res = await fetch("../../res/basic.json");
    const json: JsonTypes = await res.json();
    return json.layers[0].data;
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
