export class CaptainAnimationManager {
  protected images: ImageBitmap[][];
  constructor(images: ImageBitmap[][]) {
    this.images = images;
  }

  public static imgWidth = 192;
  public static imgHeight = 192;

  public static states = new Map([
    ["idle", 5],
    ["run", 6],
    ["jump", 3],
    ["fall", 1],
    ["ground", 2],
    ["hit", 4],
    ["deadHit", 4],
    ["deadGround", 4],
    ///with sword
    ["idleS", 5],
    ["runS", 6],
    ["jumpS", 3],
    ["fallS", 1],
    ["groundS", 2],
    ["hitS", 4],
    ["attack1S", 3],
    ["attack2S", 3],
    ["attack3S", 3],
  ]);

  public static frames = Array.from(CaptainAnimationManager.states.values());
  public static animations: Map<string, ImageBitmap[]> = new Map();
  public setMap() {
    const names = Array.from(CaptainAnimationManager.states.keys());
    names.forEach((name, index) => {
      CaptainAnimationManager.animations.set(name, this.images[index]);
    });
  }
}

export class SharkAnimationManager {
  protected images: ImageBitmap[][];
  constructor(images: ImageBitmap[][]) {
    this.images = images;
  }

  public static imgWidth = 192;
  public static imgHeight = 192;

  public static states = new Map([
    ["idle", 7],
    ["run", 6],
    ["jump", 3],
    ["fall", 1],
    ["ground", 2],
    ["anticipation", 3],
    ["attack", 3],
    ["hit", 4],
    ["deadHit", 4],
    ["deadGround", 4],
  ]);

  public static frames = Array.from(SharkAnimationManager.states.values());
  public static animations: Map<string, ImageBitmap[]> = new Map();
  public setMap() {
    const names = Array.from(SharkAnimationManager.states.keys());
    names.forEach((name, index) => {
      SharkAnimationManager.animations.set(name, this.images[index]);
    });
  }
}

import crabyImage from "../../res/world/64px/Crabby.png";
export class CrabyAnimationManager {
  protected images: ImageBitmap[][];
  constructor(images: ImageBitmap[][]) {
    this.images = images;
  }
  public static imgWidth = 320;
  public static imgHeight = 192;
  public static states = new Map([
    ["idle", 9],
    ["run", 6],
    ["jump", 3],
    ["fall", 1],
    ["ground", 2],
    ["anticipation", 3],
    ["attack", 4],
    ["hit", 4],
    ["deadHit", 4],
    ["deadGround", 4],
  ]);
  public static imgSrc = crabyImage;
  public static frames = Array.from(CrabyAnimationManager.states.values());
  public static animations: Map<string, ImageBitmap[]> = new Map();

  public setMap() {
    const names = Array.from(CrabyAnimationManager.states.keys());
    names.forEach((name, index) => {
      CrabyAnimationManager.animations.set(name, this.images[index]);
    });
  }
}
