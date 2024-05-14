import Game from "./game.ts";

const canvas = document.querySelector("canvas");

export function setCanvasWidthHeight(canvas: HTMLCanvasElement) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

export function ctxGetter(canvas: HTMLCanvasElement | null) {
  if (canvas != null) {
    setCanvasWidthHeight(canvas);
    return canvas.getContext("2d");
  } else {
    console.error("canvas not supported");
    return null;
  }
}

// main();
function main(canvas: HTMLCanvasElement | null) {
  const ctx = ctxGetter(canvas);
  if (ctx != null) {
    const game = new Game(ctx);
    game.start();
    console.log("run game");
  } else {
    console.log("canvase not found");
  }
}

main(canvas);
