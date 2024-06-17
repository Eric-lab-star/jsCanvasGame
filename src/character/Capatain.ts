import { CaptainAnimationManager } from "../animation/animationManager/AnimationManager";
import captain from "../res/captain.png";
import Character from "./Character";

export default class Captain extends Character {
  private static captainImgSize = {
    width: 192,
    height: 192,
  };

  private static captainImg = captain;

  constructor() {
    super(
      Captain.captainImgSize.width,
      Captain.captainImgSize.height,
      Array.from(CaptainAnimationManager.states.values()),
      Captain.captainImg,
    );
  }
}
