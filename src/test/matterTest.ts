/// img
import crabImg from "../res/world/64px/Crabby.png";
import captainImg from "../res/world/64px/captain.png";
import sharkImg from "../res/world/64px/shark.png";

///
import { Composite } from "matter-js";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { getWorldEelement } from "../utilz/matterComponents";
import World from "../levels/world";
import Character from "../character/Character";
import { PlayableHitBox } from "../character/PlayableHitBox";
import Sword from "../sword/sword";
import { UI } from "../UI/ui";
import { EnemyHitBox } from "../character/EnemyHitBox";

export default class MatterTest {
  private captain: Character;
  private crab: Character;
  private shark: Character;
  private world: World;

  public constructor() {
    this.world = new World();
    this.crab = new Character(crabImg, "craby");
    this.shark = new Character(sharkImg, "shark");
    this.captain = new Character(captainImg, "captain");
  }

  private async preload() {
    await World.assetPreloader();
  }

  private gen() {
    Composite.add(PhysicEnv.World, [...getWorldEelement()]);
  }

  private hitBox() {
    const captainHitBox = PlayableHitBox.withCharacter(this.captain);
    EnemyHitBox.withNPC(this.crab);
    EnemyHitBox.withNPC(this.shark);
    Sword.init(captainHitBox);
  }

  private render() {
    this.world.renderImages();
    this.crab.renderOffscreen();
    this.shark.renderOffscreen();
    this.captain.renderOffscreen();
  }

  public async run() {
    await this.preload();
    new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.gen();
    this.render();
    this.hitBox();
    const ui = new UI();

    await ui.drawGreenBoard();
    await ui.drawMessage("diamonds", { x: 40, y: 50 });
    await ui.drawMessage("kill", { x: 40, y: 100 });
  }
}
