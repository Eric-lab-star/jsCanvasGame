const offScreenCanvas = document
  .querySelector("canvas")
  .transferControlToOffscreen();

function main() {
  const width = innerWidth;
  const height = innerHeight;

  if (Worker) {
    const worker = new Worker("./workers/worker.js", {
      name: "gameWorker",
      type: "module",
    });
    worker.postMessage(
      {
        type: "start",
        canvas: offScreenCanvas,
        size: { width, height },
      },
      [offScreenCanvas],
    );
  } else {
    console.log("this browser dose not support worker");
  }
}

main();
