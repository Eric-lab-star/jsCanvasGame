import AnimationManager from "../animation/animationManager/AnimationManager";
import captainSprite from "../res/player_sprites.png";
import Character from "./Character";

export default class Captain extends Character {
  private static captainImgSize = {
    width: 64,
    height: 40,
  };

  private static captainImg = captainSprite;

  private static states = {
    idle: 5,
    run: 6,
    jump: 3,
    fall: 1,
    hit1: 2,
    hit2: 3,
    attack1: 3,
    attack2: 3,
    attack3: 3,
  };
  public static aniStates = new AnimationManager(Captain.states);

  constructor() {
    super(
      Captain.captainImgSize.width,
      Captain.captainImgSize.height,
      Captain.aniStates.frames(),
      Captain.captainImg,
      2,
    );
  }

  public setAnimationState(state: number) {
    this.animationState = state;
  }
}
