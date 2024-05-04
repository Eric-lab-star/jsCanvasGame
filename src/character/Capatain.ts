import { playerStates } from "../animationManager/CharactersManager.js";
import Vector2d from "../modules/Vector2d.js";
import Character from "./Character.js";

export default class Captain extends Character {
  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector2d,
    spriteImage: string,
    imgWidth: number,
    imgHeight: number,
  ) {
    super(ctx, position, imgWidth, imgHeight);
    this.speed = 5;
    this.spriteImage = spriteImage;
    this.animationStates = playerStates;
  }
}
