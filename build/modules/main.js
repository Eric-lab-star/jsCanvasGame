const offScreenCanvas = document
    .querySelector("canvas")
    .transferControlToOffscreen();
import { Storage } from "./Utilz.js";
Storage.set({ canvasWidth: innerWidth });
Storage.set({ canvasHeight: innerHeight });
function main() {
    if (Worker) {
        const worker = new Worker("./workers/worker.js", {
            name: "gameWorker",
            type: "module",
        });
        worker.postMessage({
            canvas: offScreenCanvas,
            size: { innerWidth, innerHeight },
        }, [offScreenCanvas]);
    }
    else {
        console.log("this browser dose not support worker");
    }
}
main();
