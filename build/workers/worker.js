import { Player } from "../modules/Player.js";
addEventListener("message", init);
let ctx;
let cv;
function init({ data: { event, canvas, size: { innerWidth, innerHeight }, }, }) {
    if (event == undefined) {
        let cv = canvas;
        cv.width = innerWidth;
        cv.height = innerHeight;
        ctx = cv.getContext("2d");
        const p1 = new Player(ctx, 20, 30);
        p1.draw();
    }
    if (event == "click") {
        console.log(cv.width);
    }
}
