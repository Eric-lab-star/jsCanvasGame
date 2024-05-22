import Captain from "../character/Capatain";

export default class KeyBoardInput {
  protected character: Captain;
  constructor(character: Captain) {
    this.character = character;
  }

  public keyPressed(key: string) {
    switch (key) {
      case "D":
      case "ㅇ":
      case "d":
        this.character.setRight(true);
        this.character.setAnimationState(Captain.aniStates.enum("run"));
        this.character.moveCaptain();
        break;
      case "a":
      case "A":
      case "ㅁ":
        this.character.setLeft(true);
        this.character.setAnimationState(Captain.aniStates.enum("run"));
        this.character.moveCaptain();
        break;
      case "w":
      case "W":
      case "ㅈ":
        this.character.setUp(true);
        this.character.setAnimationState(Captain.aniStates.enum("run"));
        this.character.moveCaptain();
        break;
      case "s":
      case "S":
      case "ㄴ":
        this.character.setDown(true);
        this.character.setAnimationState(Captain.aniStates.enum("run"));
        this.character.moveCaptain();
        break;
      default:
        break;
    }
  }

  public keyReleased(key: string) {
    switch (key) {
      case "D":
      case "ㅇ":
      case "d":
        this.character.setRight(false);
        this.character.setAnimationState(Captain.aniStates.enum("idle"));
        break;
      case "a":
      case "A":
      case "ㅁ":
        this.character.setLeft(false);
        this.character.setAnimationState(Captain.aniStates.enum("idle"));
        break;
      case "w":
      case "W":
      case "ㅈ":
        this.character.setUp(false);
        this.character.setAnimationState(Captain.aniStates.enum("idle"));
        break;
      case "s":
      case "S":
      case "ㄴ":
        this.character.setDown(false);
        this.character.setAnimationState(Captain.aniStates.enum("idle"));
        break;
      default:
        break;
    }
  }
}
