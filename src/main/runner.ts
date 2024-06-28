import MatterTest from "../test/matterTest";
import RenderTest from "../test/renderTest";
import Game from "./game";

export async function runner() {
  const game = new Game();
  game.start();
}

export function renderTestRunner() {
  const renderTest = new RenderTest();
  renderTest.start();
}

export async function matterTestRunner() {
  const matterTest = new MatterTest();
  await matterTest.run();
}
