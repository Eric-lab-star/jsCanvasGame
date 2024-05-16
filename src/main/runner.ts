import Game from "./game.ts";

export function setCanvasWidthHeight(canvas: HTMLCanvasElement) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

export function ctxGetter(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    throw new Error("canvas api is not supported");
  }
  return ctx;
}

export function runner(canvas: HTMLCanvasElement | null) {
  if (canvas == null) {
    throw new Error("canvas is null");
  }

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
