import { SharkAnimationManager } from "../animation/animationManager/AnimationManager";
import sharkImage from "../res/world/64px/shark.png";
import Character from "./Character";

export default class Shark extends Character {
  constructor() {
    super(
      192,
      192,
      Array.from(SharkAnimationManager.states.values()),
      sharkImage,
    );
  }
}
