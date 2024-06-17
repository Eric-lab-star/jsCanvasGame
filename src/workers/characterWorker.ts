import CharacterConsumer from "./characterConsumer";

/**
 * function to pass the data from the main thread to the worker
 * */
self.onmessage = async ({
  data: {
    spriteImage,
    offscreen,
    animationFrames,
    imgWidth,
    imgHeight,
    animationPort: posPort,
  },
}: MessageEvent<MessageDataType>) => {
  const characterConsumer = new CharacterConsumer(
    imgWidth,
    imgHeight,
    animationFrames,
    offscreen,
    spriteImage,
    posPort,
  );

  await characterConsumer.setAnimation();
  characterConsumer.render();
};

interface MessageDataType {
  hitBox: Matter.Body;
  spriteImage: ImageBitmap;
  offscreen: OffscreenCanvas;
  animationFrames: [];
  imgWidth: number;
  imgHeight: number;
  animationPort: MessagePort;
}
