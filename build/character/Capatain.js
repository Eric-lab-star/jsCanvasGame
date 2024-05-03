import Character from "./Character.js";
export default class Captain extends Character {
    constructor(ctx, position, spriteImage) {
        super(ctx, position);
        this.speed = 5;
        this.spriteImage = spriteImage;
    }
}
