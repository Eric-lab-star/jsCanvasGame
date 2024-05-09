import Game from "./game";

// main();
function main() {
  const canvas = document.querySelector("canvas");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const ctx = canvas.getContext("2d");
  const game = new Game(ctx);
  game.start();
}

main();
