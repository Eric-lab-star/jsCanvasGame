import { Input } from "../inputs/Keyboard.js";
import { Player } from "./Player.js";
import { Storage } from "./Utilz.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
Storage.set({ canvasWidth: innerWidth });
Storage.set({ canvasHeight: innerHeight });
function main() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const player = new Player(ctx, 10, 100);
    const playerInput = new Input(player);
    playerInput.Keyboard();
}
function gameLoop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(gameLoop);
}
main();
//# sourceMappingURL=main.js.map