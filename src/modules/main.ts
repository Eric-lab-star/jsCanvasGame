// const offScreenCanvas = document
//   .querySelector("canvas")
//   .transferControlToOffscreen();

import { Input } from "../inputs/Keyboard.js";
import { Player } from "./Player.js";
import { Storage } from "./Utilz.js";

// function main() {
//   const width = innerWidth;
//   const height = innerHeight;

//   if (Worker) {
//     const worker = new Worker("./workers/worker.js", {
//       name: "gameWorker",
//       type: "module",
//     });
//     worker.postMessage(
//       {
//         canvas: offScreenCanvas,
//         size: { width, height },
//       },
//       [offScreenCanvas],
//     );
//   } else {
//     console.log("this browser dose not support worker");
//   }
// }

// main();
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

Storage.set({ canvasWidth: innerWidth });
Storage.set({ canvasHeight: innerHeight });

function main() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const player = new Player(ctx, 10, 100);
  const playerInput = new Input(player);
  playerInput.Keyboard();
}

function gameLoop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(gameLoop);
}

main();
