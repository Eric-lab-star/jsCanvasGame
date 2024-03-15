"use strict";
self.addEventListener("connect", (e) => {
    const port = e.ports[0];
    port.onmessage = (e) => {
        const workerResult = `Result: ${e.data[0] * e.data[1]}`;
        port.postMessage(workerResult);
    };
});
//# sourceMappingURL=sharedWorker.js.map