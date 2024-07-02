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
import PlayableHitBox from "../character/PlayableHitBox";
import { UI } from "../UI/ui";
import { EnemyHitBox } from "../character/EnemyHitBox";
import HealthBar from "../UI/healthBar";

export default class MatterTest {
  private captain: Character;
  private crab: Character;
  private shark: Character;
  private world: World;
  private healthBar: HealthBar;

  public constructor() {
    this.world = new World();
    this.crab = new Character(crabImg, "craby");
    this.shark = new Character(sharkImg, "shark");
    this.captain = new Character(captainImg, "captain");
    this.healthBar = new HealthBar();
  }

  private async preload() {
    await World.assetPreloader();
    await this.healthBar.loadImage();
  }

  private gen() {
    Composite.add(PhysicEnv.World, [...getWorldEelement()]);
  }

  private hitBox() {
    const captainHitBox = PlayableHitBox.withCharacter(this.captain);
    const crab = EnemyHitBox.withNPC(this.crab, { x: 889, y: 561 });
    const shark = EnemyHitBox.withNPC(this.shark, { x: 300, y: 300 });
    captainHitBox.addEnemy(crab, shark);
    captainHitBox.initSword();
  }

  private render() {
    new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    this.world.renderImages();
    this.crab.renderOffscreen();
    this.shark.renderOffscreen();
    this.captain.renderOffscreen();
    this.healthBar.render();
  }

  public async run() {
    await this.preload();
    this.hitBox();
    this.render();
    this.gen();
    const ui = new UI();
    ui.killCountListener();

    await ui.drawGreenBoard();
    await ui.drawMessage("diamonds", { x: 40, y: 50 });
    await ui.drawMessage("kill", { x: 40, y: 100 });
  }
}
