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
        break;
      case "a":
      case "A":
      case "ㅁ":
        this.character.setLeft(true);
        break;
      case "w":
      case "W":
      case "ㅈ":
        this.character.setUp(true);
        break;
      case "s":
      case "S":
      case "ㄴ":
        this.character.setDown(true);
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
        break;
      case "a":
      case "A":
      case "ㅁ":
        this.character.setLeft(false);
        break;
      case "w":
      case "W":
      case "ㅈ":
        this.character.setUp(false);
        break;
      case "s":
      case "S":
      case "ㄴ":
        this.character.setDown(false);
        break;
      default:
        break;
    }
  }
}
