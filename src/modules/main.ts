import { Player } from "./Player.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function main() {
  if (Worker) {
    const worker = new Worker("./workers/worker.js");
    worker.postMessage({ name: "kim" });
    worker.onmessage = function (e: any) {
      console.log(e.data);
    };
  }

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
