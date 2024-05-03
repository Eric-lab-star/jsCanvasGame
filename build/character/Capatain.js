import Character from "./Character.js";
export default class Captain extends Character {
    constructor(ctx, position, size, spriteImage) {
        super(ctx, position, size);
        this.speed = 5;
        this.spriteImage = spriteImage;
    }
}
