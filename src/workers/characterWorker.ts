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
    posPort,
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

  if (characterConsumer.animation) {
    characterConsumer.render();
  } else {
    await characterConsumer.setAnimation();
    characterConsumer.render();
  }
};

interface MessageDataType {
  hitBox: Matter.Body;
  spriteImage: ImageBitmap;
  offscreen: OffscreenCanvas;
  animationFrames: [];
  imgWidth: number;
  imgHeight: number;
  posPort: MessagePort;
}
