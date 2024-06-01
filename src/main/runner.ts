import Game from "./game.ts";

export function runner() {
  const game = new Game();
  game.preload();
  game.start();

  setTimeout(() => {
    game.render();
  }, 1000);

  console.log("Game is running");
}
