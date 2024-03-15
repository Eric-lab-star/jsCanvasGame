import { Player } from "../modules/Player.js";
onmessage = function (_a) {
    var data = _a.data;
    var ctx = initCanvas(data);
    if (data.type === "start") {
        var player = new Player(ctx);
        player.draw();
        console.log(player);
    }
};
function initCanvas(data) {
    var canvas = data.canvas;
    canvas.width = data.size.width;
    canvas.height = data.size.height;
    var ctx = canvas.getContext("2d");
    return ctx;
}
//# sourceMappingURL=worker.js.map