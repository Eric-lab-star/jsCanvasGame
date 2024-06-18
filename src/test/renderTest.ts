import Captain from "../character/Capatain";
import Craby from "../character/Craby";
import Shark from "../character/Shark";
import World from "../levels/world";

export default class RenderTest {
  private captain: Captain;
  private shark: Shark;
  private world: World;
  private craby: Craby;

  public constructor() {
    this.world = new World();
    this.captain = new Captain();
    this.shark = new Shark();
    this.craby = new Craby();
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
    this.captain.renderOffscreen();
    // this.shark.renderOffscreen();
    // this.craby.renderOffscreen();
  }
}
