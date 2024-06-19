import { CaptainAnimationManager } from "../animation/animationManager/AnimationManager";
import captain from "../res/captain.png";
import Character from "./Character";

export default class Captain extends Character {
  constructor() {
    super(
      192,
      192,
      Array.from(CaptainAnimationManager.states.values()),
      captain,
      "captain",
    );
  }
}
