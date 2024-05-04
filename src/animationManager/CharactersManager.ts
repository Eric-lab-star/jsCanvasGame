import AnimationManager from "./AnimationManager.js";

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
export const playerAnimationManager = new AnimationManager(playerStates);

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
export const fierceToothAnimationManager = new AnimationManager(
  fierceToothStates,
);
