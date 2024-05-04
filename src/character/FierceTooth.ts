import Vector2d from "../modules/Vector2d.js";
import Character from "./Character.js";

export default class FierceTooth extends Character {
  constructor(ctx: CanvasRenderingContext2D, position: Vector2d) {
    super(
      ctx,
      position,
      fierceToothImgSize.width,
      fierceToothImgSize.height,
      fierceToothStates,
      fierceToothImg,
    );
  }
}

const fierceToothImgSize = {
  width: 68,
  height: 34,
};

export const fierceToothImg = "../../res/fierce_tooth.png";

/**
 *idle: 7,
 *run: 6,
 *jump: 3,
 *fall: 1,
 *ground: 2,
 *anticipation: 3,
 *attack1: 3,
 *hit: 4,
 *deatHit: 4,
 *deadGround: 4,
 *
 * */
export const fierceToothStates = {
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
