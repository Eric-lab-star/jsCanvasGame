import LevelConsumer from "./levelConsumer";

self.onmessage = async ({
  data,
}: MessageEvent<{
  canvas: OffscreenCanvas;
  levelJsonURL: string;
  image: ImageBitmap;
}>) => {
  const canvas = data.canvas;
  const image = data.image;
  const levelConsumer = new LevelConsumer(canvas, data.levelJsonURL, image);
  await levelConsumer.resolveImages();
  levelConsumer.render();
};
