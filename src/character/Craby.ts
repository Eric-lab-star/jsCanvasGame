import { CaptainAnimationManager } from "../animation/animationManager/AnimationManager";
import crabyImage from "../res/world/64px/Crabby.png";
import Character from "./Character";

export default class Craby extends Character {
  constructor() {
    super(
      320,
      192,
      Array.from(CaptainAnimationManager.states.values()),
      crabyImage,
    );
  }
}
