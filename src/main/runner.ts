import MatterTest from "../test/matterTest";

export async function matterTestRunner() {
  const matterTest = new MatterTest();
  await matterTest.run();
}
