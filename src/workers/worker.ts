import { Player } from "../modules/Player.js";

onmessage = ({ data }: MessageEvent) => {
  const ctx = initCanvas(data);

  if (data.type === "start") {
    const player = new Player(ctx);
    player.draw();
    console.log(player);
  }
};

function initCanvas(data: MessageEvent["data"]): CanvasRenderingContext2D {
  const canvas = data.canvas;
  canvas.width = data.size.width;
  canvas.height = data.size.height;
  const ctx = canvas.getContext("2d");
  return ctx;
}
