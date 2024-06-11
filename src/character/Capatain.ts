import AnimationManager from "../animation/animationManager/AnimationManager";
import captain from "../res/captain.png";
import Character from "./Character";
import { HitBox } from "./HitBox";

export default class Captain extends Character {
  private static captainImgSize = {
    width: 192,
    height: 192,
  };

  private static captainImg = captain;

  private static states = {
    idle: 5,
    run: 6,
    jump: 3,
    fall: 1,
    ground: 2,
    hit: 4,
    deadHit: 4,
    deadGround: 4,
  };
  public static aniStates = new AnimationManager(Captain.states);
  public hitBox: HitBox | undefined;

  constructor() {
    super(
      Captain.captainImgSize.width,
      Captain.captainImgSize.height,
      Captain.aniStates.frames(),
      Captain.captainImg,
    );
  }
}
