/**
 * animation manager is used to manage animation
 * information. animation informations are number of
 * frames used in animation and animation name.
 */
export class CaptainAnimationManager {
  protected images: ImageBitmap[][];
  constructor(images: ImageBitmap[][]) {
    this.images = images;
  }

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

  public static animations: Map<string, ImageBitmap[]> = new Map();
  public setMap() {
    const names = Array.from(CaptainAnimationManager.states.keys());
    names.forEach((name, index) => {
      CaptainAnimationManager.animations.set(name, this.images[index]);
    });
  }
}
