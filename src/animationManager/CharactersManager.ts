import { playerStates } from "../character/Capatain";
import { fierceToothStates } from "../character/FierceTooth";
import AnimationManager from "./AnimationManager";

export const playerAnimationManager = new AnimationManager(playerStates);

export const fierceToothAnimationManager = new AnimationManager(
  fierceToothStates,
);
