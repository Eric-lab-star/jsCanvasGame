import GameEnv from "../env/GameEnv.ts";
import Game from "./game.ts";

export function setCanvasWidthHeight(canvas: HTMLCanvasElement) {
  canvas.width = GameEnv.GAME_WIDTH;
  canvas.height = GameEnv.GAME_HEIGHT;
}

export function ctxGetter(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    throw new Error("canvas api is not supported");
  }
  return ctx;
}

export function runner(canvas: HTMLCanvasElement) {
  setCanvasWidthHeight(canvas);
  try {
    const ctx = ctxGetter(canvas);
    const game = new Game(ctx);
    game.start();
    console.log("START GAME");
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}
