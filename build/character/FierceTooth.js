import { fierceToothStates } from "../animationManager/CharactersManager.js";
import Character from "./Character.js";
export default class FierceTooth extends Character {
    constructor(ctx, position, spriteImage, imgWidth, imgHeight) {
        super(ctx, position, imgWidth, imgHeight);
        this.speed = 5;
        this.spriteImage = spriteImage;
        this.animationStates = fierceToothStates;
    }
}
