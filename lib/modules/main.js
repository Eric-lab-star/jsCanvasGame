"use strict";

var _game = _interopRequireDefault(require("./game.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// main();
function main() {
  const canvas = document.querySelector("canvas");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const ctx = canvas.getContext("2d");
  const game = new _game.default(ctx);
  game.start();
}
main();