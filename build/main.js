import { Player } from "./Player.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const x = canvas.width / 2;
const y = canvas.height / 2;
const playerProps = {
    ctx,
    x,
    y,
    radius: 30,
    color: "blue",
};
const player = new Player(playerProps);
player.draw();
//# sourceMappingURL=main.js.map