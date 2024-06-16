import captain from "../res/captain.png";
import Character from "./Character";
import { HitBox } from "./HitBox";

export default class Captain extends Character {
  private static captainImgSize = {
    width: 192,
    height: 192,
  };

  private static captainImg = captain;

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

  public static aniStates = function () {
    const values = Captain.states.values();
    const valuesArray = Array.from(values);
    return valuesArray;
  };
  public hitBox: HitBox | undefined;

  constructor() {
    super(
      Captain.captainImgSize.width,
      Captain.captainImgSize.height,
      Captain.aniStates(),
      Captain.captainImg,
    );
  }
}
