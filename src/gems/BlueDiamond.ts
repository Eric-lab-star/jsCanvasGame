import StaticHitBox from "../character/StaticHitBox";
import StaticEntity from "../staticEntity/staticEntity";

/// images
import BlueDiamond1 from "../res/world/64px/Blue Diamond/01.png";
import BlueDiamond2 from "../res/world/64px/Blue Diamond/02.png";
import BlueDiamond3 from "../res/world/64px/Blue Diamond/03.png";
import BlueDiamond4 from "../res/world/64px/Blue Diamond/04.png";
//
export default class BlueDiamond {
  public counter: number;
  public hitBox: StaticHitBox;
  public entity: StaticEntity;
  public event: Event;
  constructor(
    pos: { x: number; y: number },
    xOffset: number = 0,
    yOffset: number = 0,
  ) {
    this.counter = 0;
    this.hitBox = new StaticHitBox("blueDiamond", 10, 10, {
      x: pos.x - xOffset,
      y: pos.y - yOffset,
    });
    this.entity = new StaticEntity([
      BlueDiamond1,
      BlueDiamond2,
      BlueDiamond3,
      BlueDiamond4,
    ]);
    this.event = new Event("collectDiamond", { bubbles: true });
  }

  public async spawn() {
    if (StaticEntity.bitMapImages.length === 0) {
      await this.entity.preloadImages();
    }
    this.entity.render();
    this.hitBox.updateEntityPos(this.entity);
  }

  public emitEvent() {
    dispatchEvent(this.event);
  }

  public static collectedDiamonds: number = 0;
  public static onScreenDiamonds: BlueDiamond[] = [];
}
