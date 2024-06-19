import World from "../levels/world";

export default class RenderTest {
  private world: World;

  public constructor() {
    this.world = new World();
  }

  // level specific test worker
  public async start() {
    addEventListener("keydown", (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "r") {
        window.location.reload();
      }
    });
    await World.assetPreloader();

    this.world.render();
  }
}
