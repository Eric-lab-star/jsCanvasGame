import { Player } from "../modules/Player.js";

let player: Player;
let ctx: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;

onmessage = ({ data }: MessageEvent) => {};

function init(data: MessageEvent["data"]) {
  canvas = data.canvas;
  canvas.width = data.size.width;
  canvas.height = data.size.height;
  ctx = canvas.getContext("2d");
  player = new Player(ctx);
}

function PlayerMove() {
  player.draw();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  PlayerMove();
  requestAnimationFrame(gameLoop);
}
