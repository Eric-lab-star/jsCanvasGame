"use strict";
onmessage = function (e) {
    console.log("recieved message from main.js", e.data);
    postMessage("hello main.js");
};
//# sourceMappingURL=worker.js.map