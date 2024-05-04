import Character from "./Character.js";
export default class FierceTooth extends Character {
    constructor(ctx, position) {
        super(ctx, position, fierceToothImgSize.width, fierceToothImgSize.height, fierceToothStates, fierceToothImg);
    }
}
const fierceToothImgSize = {
    width: 68,
    height: 34,
};
export const fierceToothImg = "../../res/fierce_tooth.png";
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
