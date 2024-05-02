import ImageLoader from "../image/ImageLoader.js";
import KeyBoardInput from "../inputs/Keyboard.js";
import Vector2d from "./Vector2d.js";

class Circle {
  protected ctx: CanvasRenderingContext2D;
  protected pos: Vector2d;
  protected size: number;
  protected color: string;
  public speed: number;
  protected img: ImageBitmap;
  protected sprites: ImageBitmap[];

  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector2d,
    size: number,
    color: string,
  ) {
    this.ctx = ctx;
    this.pos = position;
    this.size = size;
    this.color = color;
    this.speed = 30;
    new KeyBoardInput(this);
  }

  // handleAnimation function either getSprite image
  // or drawAnimation. Received Parameter is passed to
  // drawAnimation
  public handleAnimation(i: number) {
    if (this.sprites != undefined) {
      this.drawAnimation(i);
    } else {
      this.getSprite();
    }
  }

  //5 % 2 = 1
  //1 = 5 - 2*(5/2)
  public drawAnimation(i: number) {
    const intValue = Math.floor(i / this.sprites.length);
    const modulo = i - this.sprites.length * intValue; // 0 <= sprites.length < i
    this.ctx.drawImage(this.sprites[modulo], this.pos.x, this.pos.y);
  }

  public getSprite() {
    const loader = new ImageLoader();
    loader.loadSprites(ImageLoader.Sprites);
    loader.msgPort.onmessage = (e: MessageEvent) => {
      if (e.data.type == "sprites") {
        this.sprites = e.data.load;
      }
    };
  }

  public handleImage() {
    if (this.img != undefined) {
      this.drawImage();
    } else {
      this.getImage();
    }
  }

  public getImage() {
    const loader = new ImageLoader();
    loader.load(ImageLoader.Runsword01);
    loader.msgPort.onmessage = (e: MessageEvent) => {
      this.img = e.data;
    };
  }

  public drawImage() {
    this.ctx.drawImage(this.img, this.pos.x, this.pos.y);
  }

  public drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, true);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  public update(x: number, y: number) {
    this.pos.update(x, y);
    this.drawImage();
  }

  public setSpeed(s: number) {
    this.speed = s;
  }
}

export default Circle;
