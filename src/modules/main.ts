import Game from "./game.js";

// main();
function main() {
  console.log("hello");

  const canvas = document.querySelector("canvas");
  console.log();

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const ctx = canvas.getContext("2d");
  const game = new Game(ctx);
  game.start();
}

main();
