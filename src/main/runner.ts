import MatterTest from "../test/matterTest.ts";
import RenderTest from "../test/renderTest.ts";
import Game from "./game.ts";

export function runner() {
  const game = new Game();
  game.start();

  //  const matterTest = new MatterTest();
  // matterTest.start();
  // const renderTest = new RenderTest();
  // renderTest.start();
}
