import LevelConsumer, { JsonTypes } from "./levelConsumer";

self.onmessage = async ({
  data,
}: MessageEvent<{
  canvas: OffscreenCanvas;
  levelJsonURL: JsonTypes;
  image: ImageBitmap;
}>) => {
  const canvas = data.canvas;
  const image = data.image;
  const levelConsumer = new LevelConsumer(canvas, data.levelJsonURL, image);
  await levelConsumer.resolveImages();
  levelConsumer.render();
};
