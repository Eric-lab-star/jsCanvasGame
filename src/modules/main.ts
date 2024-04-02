const offScreenCanvas = document
  .querySelector("canvas")
  .transferControlToOffscreen();

// main();
function main() {
  if (Worker) {
    initWorer();
  } else {
    console.log("this browser dose not support worker");
  }
}

main();

function initWorer() {
  const worker = new Worker("./workers/worker.js", {
    name: "gameWorker",
    type: "module",
  });

  worker.postMessage(
    {
      canvas: offScreenCanvas,
      size: { innerWidth, innerHeight },
    },
    [offScreenCanvas],
  );

  window.addEventListener("click", () => {
    worker.postMessage(
      {
        event: "click",
        size: { innerWidth, innerHeight },
        canvas: offScreenCanvas,
      },
      [offScreenCanvas],
    );
  });
}
