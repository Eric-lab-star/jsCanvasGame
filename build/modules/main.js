"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_js_1 = __importDefault(require("./game.js"));
function main() {
    const canvas = document.querySelector("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const ctx = canvas.getContext("2d");
    const game = new game_js_1.default(ctx);
    game.start();
}
main();
