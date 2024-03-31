let canvas: OffscreenCanvas;
let ctx: OffscreenCanvasRenderingContext2D;

self.onmessage = function init({ data }: MessageEvent) {
  canvas = data.canvas;
  ctx = canvas.getContext("2d");
  console.log(canvas.width);
};
