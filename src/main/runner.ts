import MatterTest from "../test/matterTest";
import RenderTest from "../test/renderTest";

export function renderTestRunner() {
  const renderTest = new RenderTest();
  renderTest.start();
}

export async function matterTestRunner() {
  const matterTest = new MatterTest();
  await matterTest.run();
}
