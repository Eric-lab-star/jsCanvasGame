import CanvasEnv from "../env/CanvasEnv";
import GameEnv from "../env/GameEnv";
import BlueDiamond from "../gems/BlueDiamond";

import letters from "../res/world/64px/Big Text/superBigAlphabets.png";

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
  private canvasEnv: CanvasEnv;
  private ctx: CanvasRenderingContext2D;
  private letterSpriteWitdh: number = 32;
  private letterSpriteHeight: number = 32;
  private images: ImageBitmap[] = [];
  private canvasEnvs: CanvasEnv[] = [];

  constructor() {
    this.canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.ctx = this.canvasEnv.getCtx();
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
    addEventListener("collectDiamond", () => {
      this.showCollectedDiamonds();
    });
  }

  public async drawMessage(message: string, pos: { x: number; y: number }) {
    const canvasEnv = new CanvasEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.canvasEnvs.push(canvasEnv);
    const ctx = canvasEnv.getCtx();
    const images = await this.parseImageAtlas();
    for (let i = 0; i < message.length; i++) {
      ctx.drawImage(
        images[Letter[message[i].toUpperCase() as keyof typeof Letter]],
        pos.x + this.letterSpriteWitdh * i,
        pos.y,
      );
    }
  }

  public parseImageAtlas() {
    const promise = new Promise<ImageBitmap[]>((resolve) => {
      const imageBitMaps: ImageBitmap[] = [];
      const image = new Image();
      image.src = letters;
      image.onload = async () => {
        for (let i = 0; i < 36; i++) {
          const imageBitMap = await createImageBitmap(
            image,
            this.letterSpriteWitdh * i,
            0,
            this.letterSpriteWitdh,
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
    msg: string = "diamonds",
    pos: { x: number; y: number } = { x: 10, y: 50 },
  ) {
    this.images = await this.parseImageAtlas();
    this.ctx.reset();
    const count = BlueDiamond.collectedDiamonds;
    if (count <= 9) {
      this.ctx.drawImage(
        this.images[count + 26],
        pos.x + this.letterSpriteWitdh * msg.length + 10,
        pos.y,
      );
      return;
    }
    if (count > 9 && count <= 99) {
      const firstDigit = Math.floor(count / 10);
      const secondDigit = count % 10;
      this.ctx.drawImage(
        this.images[firstDigit + 26],
        pos.x + this.letterSpriteWitdh * msg.length + 10,
        pos.y,
      );
      this.ctx.drawImage(
        this.images[secondDigit + 26],
        pos.x +
          this.letterSpriteWitdh * msg.length +
          10 +
          this.letterSpriteWitdh,
        pos.y,
      );
      return;
    }
  }
  public toggleUI() {
    this.canvasEnv.toggleCanvas();
    for (const canvasEnv of this.canvasEnvs) {
      canvasEnv.toggleCanvas();
    }
    console.log("UI is hidden");
  }
}
