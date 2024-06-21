/// img
import crabImg from "../res/world/64px/Crabby.png";
import captainImg from "../res/world/64px/captain.png";
import sharkImg from "../res/world/64px/shark.png";

import BlueDiamond1 from "../res/world/64px/Blue Diamond/01.png";
import BlueDiamond2 from "../res/world/64px/Blue Diamond/02.png";
import BlueDiamond3 from "../res/world/64px/Blue Diamond/03.png";
import BlueDiamond4 from "../res/world/64px/Blue Diamond/04.png";
///
import { Composite } from "matter-js";
import GameEnv from "../env/GameEnv";
import PhysicEnv from "../env/PhysicEnv";
import { getWorldEelement } from "../utilz/matterComponents";
import World from "../levels/world";
import Character from "../character/Character";
import { PlayableHitBox } from "../character/PlayableHitBox";
import { EnemyHitBox } from "../character/EnemyHitBox";
import Sword from "../sword/sword";
import StaticHitBox from "../character/StaticHitBox";
import StaticEntity from "../staticEntity/staticEntity";

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
    // EnemyHitBox.withNPC(this.crab);
    // EnemyHitBox.withNPC(this.shark);
    Sword.init(captainHitBox);
  }

  private render() {
    this.world.renderImages();
    // this.crab.renderOffscreen();
    // this.shark.renderOffscreen();
    this.captain.renderOffscreen();
  }

  public async run() {
    new PhysicEnv(GameEnv.GAME_WIDTH, GameEnv.GAME_HEIGHT);
    await this.preload();
    this.gen();
    this.render();
    this.hitBox();
    const staticHitBox = new StaticHitBox("staticEntity", 20, 20, {
      x: 900,
      y: 500,
    });
    const entity = new StaticEntity([
      BlueDiamond1,
      BlueDiamond2,
      BlueDiamond3,
      BlueDiamond4,
    ]);
    staticHitBox.withEntity(entity);
    entity.create();
  }
}
