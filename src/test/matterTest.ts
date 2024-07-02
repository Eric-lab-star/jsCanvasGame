/// img
import crabImg from "../res/world/64px/Crabby.png";
import captainImg from "../res/world/64px/captain.png";
import sharkImg from "../res/world/64px/shark.png";

///
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { getWorldEelement } from "../utilz/matterComponents";
import World from "../levels/world";
import Character from "../character/Character";
import PlayableHitBox from "../character/PlayableHitBox";
import { UI } from "../UI/ui";
import HealthBar from "../UI/healthBar";
import { Composite } from "matter-js";
import SharkHitBox from "../character/SharkHitBox";
import CrabyHitBox from "../character/CrabyHitBox";

export default class MatterTest {
  private captain: Character;
  private crab: Character;
  private shark: Character;
  private world: World;
  private healthBar: HealthBar;
  private physic: PhysicEnv;

  public constructor() {
    this.physic = new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
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
    const crab = new CrabyHitBox(this.crab, {
      x: 890,
      y: 561,
    });

    const shark = new SharkHitBox(this.shark, {
      x: 300,
      y: 300,
    });

    crab.moveCrab();
    shark.moveShark();
    captainHitBox.addEnemy(crab.hitBox, shark.hitBox);
    captainHitBox.initSword();
  }

  private render() {
    this.world.renderImages();
    this.crab.renderOffscreen();
    this.shark.renderOffscreen();
    this.captain.renderOffscreen();
    this.healthBar.render();
  }

  public async run() {
    await this.preload();
    this.physic.run();
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
