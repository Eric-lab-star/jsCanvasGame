export interface KeyBoardListener {
  setRight: (value: boolean) => void;
  setLeft: (value: boolean) => void;
  setUp: (value: boolean) => void;
  setDown: (value: boolean) => void;
}

export default class BodyKeyMaps {
  public keyboardListener: KeyBoardListener;

  constructor(keyboardListner: KeyBoardListener) {
    this.keyboardListener = keyboardListner;
  }

  public keyDown(key: string) {
    switch (key) {
      case "D":
      case "ㅇ":
      case "d":
        this.keyboardListener.setRight(true);
        break;
      case "a":
      case "A":
      case "ㅁ":
        this.keyboardListener.setLeft(true);
        break;
      case "w":
      case "W":
      case "ㅈ":
        this.keyboardListener.setUp(true);
        break;
      case "s":
      case "S":
      case "ㄴ":
        this.keyboardListener.setDown(true);
        break;
      default:
        break;
    }
  }

  public keyUp(key: string) {
    switch (key) {
      case "D":
      case "ㅇ":
      case "d":
        this.keyboardListener.setRight(false);
        break;
      case "a":
      case "A":
      case "ㅁ":
        this.keyboardListener.setLeft(false);
        break;
      case "w":
      case "W":
      case "ㅈ":
        this.keyboardListener.setUp(false);
        break;
      case "s":
      case "S":
      case "ㄴ":
        this.keyboardListener.setDown(false);
        break;
      default:
        break;
    }
  }
}
