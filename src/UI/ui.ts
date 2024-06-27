import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import BlueDiamond from "../gems/BlueDiamond";

import letters from "../res/world/64px/Big Text/superBigAlphabets.png";
import GreenBoard from "../res/world/64px/UI/GreeBoard.png";

enum Letter {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
  E = 4,
  F = 5,
  G = 6,
  H = 7,
  I = 8,
  J = 9,
  K = 10,
  L = 11,
  M = 12,
  N = 13,
  O = 14,
  P = 15,
  Q = 16,
  R = 17,
  S = 18,
  T = 19,
  U = 20,
  V = 21,
  W = 22,
  X = 23,
  Y = 24,
  Z = 25,

  ZERO = 26,
  ONE = 27,
  TWO = 28,
  THREE = 29,
  FOUR = 30,
  FIVE = 31,
  SIX = 32,
  SEVEN = 33,
  EIGHT = 34,
  NINE = 35,
}

export class UI {
  private letterSpriteWidth: number = 32;
  private letterSpriteHeight: number = 32;
  private images: ImageBitmap[] = [];
  private canvasEnvs: CanvasEnv[] = [];
  private zIndex: number = 100;
  private killCount: number = 0;

  constructor() {
    this.collectDiamondEvent();
    this.keyDownEvent();
  }

  private keyDownEvent() {
    addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Tab":
          this.toggleUI();
          break;
      }
    });
  }

  private collectDiamondEvent() {
    const canvas = new CanvasEnv(
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
      this.zIndex,
    );
    this.canvasEnvs.push(canvas);
    addEventListener("collectDiamond", async () => {
      await this.showCollectedDiamonds(
        canvas.getCtx(),
        { x: 40, y: 50 },
        "diamonds",
      );
    });
  }

  public killCountListener() {
    const canvas = new CanvasEnv(
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
      this.zIndex,
    );
    const ctx = canvas.getCtx();
    this.canvasEnvs.push(canvas);
    addEventListener("killCount", async () => {
      this.killCount++;
      await this.killCounter(ctx, {
        x: 40,
        y: 100,
      });
    });
  }

  public async killCounter(
    ctx: CanvasRenderingContext2D,
    pos: { x: number; y: number },
  ) {
    if (this.images.length <= 0) {
      this.images = await this.parseImageAtlas();
    }
    ctx.reset();
    this.paintNumber(this.killCount, ctx, pos, "kill");
  }

  public async drawGreenBoard() {
    const canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.canvasEnvs.push(canvasEnv);
    const ctx = canvasEnv.getCtx();
    const image = new Image();
    image.src = GreenBoard;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
  }

  public async drawMessage(message: string, pos: { x: number; y: number }) {
    const canvasEnv = new CanvasEnv(
      GameEnv.GAME_WIDTH,
      GameEnv.GAME_HEIGHT,
      this.zIndex,
    );
    this.canvasEnvs.push(canvasEnv);
    const ctx = canvasEnv.getCtx();
    if (this.images.length === 0) {
      this.images = await this.parseImageAtlas();
    }
    for (let i = 0; i < message.length; i++) {
      ctx.drawImage(
        this.images[Letter[message[i].toUpperCase() as keyof typeof Letter]],
        pos.x + this.letterSpriteWidth * i,
        pos.y,
      );
    }
  }

  private parseImageAtlas() {
    const promise = new Promise<ImageBitmap[]>((resolve) => {
      const imageBitMaps: ImageBitmap[] = [];
      const image = new Image();
      image.src = letters;
      image.onload = async () => {
        for (let i = 0; i < 36; i++) {
          const imageBitMap = await createImageBitmap(
            image,
            this.letterSpriteWidth * i,
            0,
            this.letterSpriteWidth,
            this.letterSpriteHeight,
          );
          imageBitMaps.push(imageBitMap);
        }
        resolve(imageBitMaps);
      };
    });
    return promise;
  }

  public async showCollectedDiamonds(
    ctx: CanvasRenderingContext2D,
    pos: { x: number; y: number },
    msg: string,
  ) {
    if (this.images.length === 0) {
      this.images = await this.parseImageAtlas();
    }
    ctx.reset();
    const count = BlueDiamond.collectedDiamonds;
    this.paintNumber(count, ctx, pos, msg);
  }

  private paintNumber(
    count: number,
    ctx: CanvasRenderingContext2D,
    pos: { x: number; y: number },
    msg: string = "",
  ) {
    if (count <= 9) {
      ctx.drawImage(
        this.images[count + 26],
        pos.x + this.letterSpriteWidth * (msg.length + 1),
        pos.y,
      );
      return;
    }
    if (count > 9 && count <= 99) {
      const firstDigit = Math.floor(count / 10);
      const secondDigit = count % 10;
      ctx.drawImage(
        this.images[firstDigit + 26],
        pos.x + this.letterSpriteWidth * msg.length + 10,
        pos.y,
      );
      ctx.drawImage(
        this.images[secondDigit + 26],
        pos.x +
          this.letterSpriteWidth * msg.length +
          10 +
          this.letterSpriteWidth,
        pos.y,
      );
      return;
    }
  }
  public toggleUI() {
    for (const canvasEnv of this.canvasEnvs) {
      canvasEnv.toggleCanvas();
    }
  }
}
