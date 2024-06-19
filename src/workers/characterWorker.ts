import CaptainConsumer from "./workerConsumers/captainConsumer";
import CrabyConsumer from "./workerConsumers/crabyConsumer";
import SharkConsumer from "./workerConsumers/sharkConsumer";

/**
 * function to pass the data from the main thread to the worker
 * */
self.onmessage = async ({ data }: MessageEvent<MessageDataType>) => {
  switch (data.label) {
    case "captain":
      captainConsumer(data);
      break;
    case "shark":
      sharkConsumer(data);
      break;
    case "craby":
      crabyConsumer(data);
      break;
    default:
      console.error(`${data.label} is not proper label`);
      break;
  }
};

async function crabyConsumer(data: MessageDataType) {
  const characterConsumer = new CrabyConsumer(
    data.offscreen,
    data.spriteImage,
    data.animationPort,
  );

  await characterConsumer.setAnimation();
  characterConsumer.render();
}

async function sharkConsumer(data: MessageDataType) {
  const characterConsumer = new SharkConsumer(
    data.offscreen,
    data.spriteImage,
    data.animationPort,
  );

  await characterConsumer.setAnimation();
  characterConsumer.render();
}

async function captainConsumer(data: MessageDataType) {
  const characterConsumer = new CaptainConsumer(
    data.offscreen,
    data.spriteImage,
    data.animationPort,
  );

  await characterConsumer.setAnimation();
  characterConsumer.render();
}

interface MessageDataType {
  label: string;
  hitBox: Matter.Body;
  spriteImage: ImageBitmap;
  offscreen: OffscreenCanvas;
  animationPort: MessagePort;
}
