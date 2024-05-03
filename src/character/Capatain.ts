import Vector2d from "../modules/Vector2d.js";
import Character from "./Character.js";

export default class Captain extends Character {
  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector2d,
    size: number,
    spriteImage: string,
  ) {
    super(ctx, position, size);
    this.speed = 5;
    this.spriteImage = spriteImage;
  }
}
