import { playerStates } from "../character/Capatain.js";
import { fierceToothStates } from "../character/FierceTooth.js";
import AnimationManager from "./AnimationManager.js";

export const playerAnimationManager = new AnimationManager(playerStates);

export const fierceToothAnimationManager = new AnimationManager(
  fierceToothStates,
);
