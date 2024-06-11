import CharacterConsumer from "./characterConsumer";

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
  posPort: MessagePort;
}
