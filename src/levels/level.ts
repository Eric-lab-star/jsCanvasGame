import Matter from "matter-js";
import GameEnv from "../env/GameEnv";
import tileAtlas from "../res/terrain.png";

const { Bodies } = Matter;
export default class Level extends GameEnv {
  public resolvedImages: ImageBitmap[] = [];
  private tileAtlasImage: HTMLImageElement;
  private mapJsonURL: string;
  public messageChan = new MessageChannel();

  private static TERRAIN_TILE: string = tileAtlas;
  constructor(mapJsonURL: string) {
    super();
    this.tileAtlasImage = new Image();
    this.mapJsonURL = mapJsonURL;
  }

  public addMatter() {
    const ground = Bodies.rectangle(
      this.getGameWidth() / 2,
      this.getGameHeight() - (Level.tileMapProps.getTileSize() * 4) / 2,
      this.getGameWidth(),
      Level.tileMapProps.getTileSize() * 4,
      {
        isStatic: true,
        render: {
          opacity: 0,
        },
      },
    );

    this.addComponent(ground);
  }

  /**
   * paint level on screen when resolvedImages event is fired from resolveImages function
   * */
  public render() {
    const tilesize = Level.tileMapProps.getTileSize();
    const mapColumns = Level.tileMapProps.getMapColumns();
    this.tileLoop((col, row) => {
      this.ctx.drawImage(
        this.resolvedImages[row * mapColumns + col],
        col * tilesize,
        row * tilesize,
      );
    });
  }

  /**
   * resolveImages function calls createBitImageSet function to assign bitmap images to resolvedImages.
   * after resolving bitmap images, this.canvas fires resolvedImages event
   *
   * */
  public resolveImages() {
    this.addMatter();
    this.tileAtlasImage.src = Level.TERRAIN_TILE;
    this.tileAtlasImage.addEventListener(
      "load",
      async () => {
        const images = await this.createBitImageSet();
        this.resolvedImages = await Promise.all(images);
        this.messageChan.port1.postMessage("resolvedImages");
      },
      { once: true },
    );
  }

  /**
   * create bitmap image sets using json data
   * */
  public async createBitImageSet() {
    const images: Promise<ImageBitmap>[] = [];
    const data = await this.getData();
    this.tileLoop((x: number, y: number) => {
      const id = data[y * Level.tileMapProps.getMapColumns() + x] - 1;
      const ty = Math.floor(id / Level.tileMapProps.getTilesMapColumns());
      const tx = id - ty * Level.tileMapProps.getTilesMapColumns();
      const bitImg = this.cropTileAtlasImage(ty, tx);
      images.push(bitImg);
    });
    return images;
  }

  /**
   * get data from json file
   * */
  public async getData() {
    const res = await fetch(this.mapJsonURL);
    const json: JsonTypes = await res.json();
    return json.layers[0].data;
  }

  /**
   * crop tile atlas image
   * */
  private cropTileAtlasImage(ty: number, tx: number) {
    const tilesize = Level.tileMapProps.getTileSize();
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

  /**
   * utility function to loop over data
   * */
  public tileLoop(callback: (col: number, row: number) => void) {
    for (let row = 0; row < Level.tileMapProps.getMapRows(); row++) {
      for (let col = 0; col < Level.tileMapProps.getMapColumns(); col++) {
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
