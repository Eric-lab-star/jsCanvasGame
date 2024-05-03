import Vector2d from "../modules/Vector2d.js";
import Character from "./Character.js";

export default class FierceTooth extends Character {
  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector2d,
    spriteImage: string,
  ) {
    super(ctx, position);
    this.speed = 5;
    this.spriteImage = spriteImage;
  }
}
