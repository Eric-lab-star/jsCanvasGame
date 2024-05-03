import PlayerAnimation from "../animation/playerAnimation.js";
import Captain from "../character/Capatain.js";
import Character from "../character/Character.js";
import ImageLoader from "../image/ImageLoader.js";
import Vector2d from "./Vector2d.js";

class Game {
  private ctx: CanvasRenderingContext2D;
  private player: Character;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.initCharacters();
  }

  public start() {
    this.loop();
  }

  public initCharacters() {
    const playerPos = new Vector2d(innerWidth / 2, innerHeight / 2);
    this.player = new Captain(
      this.ctx,
      playerPos,
      50,
      ImageLoader.playerSprites,
    );
  }

  private loop() {
    let animationTick = 0;
    const animationSpeed = 10;
    const runner = () => {
      animationTick += 1 / animationSpeed;
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      this.player.handleAnimation(
        Math.floor(animationTick),
        PlayerAnimation.run,
      );
      requestAnimationFrame(() => runner());
    };
    runner();
  }
}

export default Game;
