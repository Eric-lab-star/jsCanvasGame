import CharacterConsumer from "./characterConsumer";

self.onmessage = async ({
  data: {
    hitBox,
    spriteImage,
    offscreen,
    animationFrames,
    scale,
    imgWidth,
    imgHeight,
  },
}: MessageEvent<MessageDataType>) => {
  const characterConsumer = new CharacterConsumer(
    imgWidth,
    imgHeight,
    animationFrames,
    scale,
    offscreen,
    hitBox,
    spriteImage,
  );

  await characterConsumer.setAnimation();
  characterConsumer.render();
};

interface MessageDataType {
  hitBox: Matter.Body;
  spriteImage: ImageBitmap;
  offscreen: OffscreenCanvas;
  animationFrames: [];
  scale: number;
  imgWidth: number;
  imgHeight: number;
}
