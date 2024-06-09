import MatterTest from "../test/matterTest";
import RenderTest from "../test/renderTest";
import Game from "./game";

export function runner() {
  const game = new Game();
  game.start();
}

export function renderTestRunner() {
  const rendeerTest = new RenderTest();
  rendeerTest.start();
}

export function matterTestRunner() {
  const matterTest = new MatterTest();
  matterTest.run();
}
