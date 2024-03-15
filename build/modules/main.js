"use strict";
var offScreenCanvas = document
    .querySelector("canvas")
    .transferControlToOffscreen();
function main() {
    var width = innerWidth;
    var height = innerHeight;
    if (Worker) {
        var worker = new Worker("./workers/worker.js", {
            name: "gameWorker",
            type: "module",
        });
        worker.postMessage({
            type: "start",
            canvas: offScreenCanvas,
            size: { width: width, height: height },
        }, [offScreenCanvas]);
    }
    else {
        console.log("this browser dose not support worker");
    }
}
main();
//# sourceMappingURL=main.js.map