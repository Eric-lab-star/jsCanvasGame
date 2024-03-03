import { Player } from "./Player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function main() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const player = new Player(ctx);

  function gameLoop() {
    requestAnimationFrame(gameLoop);
    player.draw();
  }
  gameLoop();
}

main();
