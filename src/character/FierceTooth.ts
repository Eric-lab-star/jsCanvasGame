import AnimationManager from "../animationManager/AnimationManager";
import Vector2d from "../utilz/Vector2d";
import Character from "./Character";

export default class FierceTooth extends Character {
  private static fierceToothImgSize = {
    width: 68,
    height: 34,
  };

  private static fierceToothImg = "../../res/fierce_tooth.png";

  private static fierceToothStates = {
    idle: 7,
    run: 6,
    jump: 3,
    fall: 1,
    ground: 2,
    anticipation: 3,
    attack1: 3,
    hit: 4,
    deatHit: 4,
    deadGround: 4,
  };

  private static fierceToothAniStates = new AnimationManager(
    FierceTooth.fierceToothStates,
  );
  constructor(ctx: CanvasRenderingContext2D, position: Vector2d) {
    super(
      ctx,
      position,
      FierceTooth.fierceToothImgSize.width,
      FierceTooth.fierceToothImgSize.height,
      FierceTooth.fierceToothAniStates.frames(),
      FierceTooth.fierceToothImg,
    );
  }
}
