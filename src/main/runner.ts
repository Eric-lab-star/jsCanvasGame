import Game from "./game.ts";

export function runner() {
  const game = new Game();
  game.start();

  console.log("Game is running");
}
