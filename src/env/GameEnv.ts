export default class GameEnv {
  public static GAME_WIDTH: number = 1280;

  public static GAME_HEIGHT: number = 800;

  private static animationSpeed: number = 10;
  public static getAnimationSpeed() {
    return GameEnv.animationSpeed;
  }

  private static animationTick: number = 0;
  public static getAnimationTick() {
    return GameEnv.animationTick;
  }
  public static setAnimationTick(increment: number) {
    GameEnv.animationTick += increment;
  }

  public static runAnimationTick() {
    GameEnv.animationTick += 1 / GameEnv.animationSpeed;
    return Math.floor(GameEnv.animationTick);
  }
}
