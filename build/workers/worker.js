let canvas;
let ctx;
self.onmessage = function init({ data }) {
    canvas = data.canvas;
    ctx = canvas.getContext("2d");
    console.log(canvas.width);
};
export {};
