import Vector2d from "../modules/Vector2d";
import Character from "./Character";

export default class Captain extends Character {
  constructor(ctx: CanvasRenderingContext2D, position: Vector2d) {
    super(
      ctx,
      position,
      captainImgSize.width,
      captainImgSize.height,
      playerStates,
      captainImg,
    );
  }
}

const captainImgSize = {
  width: 64,
  height: 40,
};

/**
 *idle: 5,
 *run: 6,
 *jump: 3,
 *fall: 1,
 *hit1: 2,
 *hit2: 3,
 *attack1: 3,
 *attack2: 3,
 *attack3: 3,
 * */
const captainImg = "../../res/player_sprites.png";

export const playerStates = {
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
