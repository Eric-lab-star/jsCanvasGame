type stateObj = {
  [key: string]: number;
};

export default class AnimationManager {
  public state: any;
  public keys: string[];
  public values: number[];
  public ordinal: { [key: string]: number };

  constructor(state: stateObj) {
    this.state = state;
    this.keys = Object.keys(state);
    this.values = Object.values(state);
    this.ordinal = this.enum();
  }
  public enum() {
    const entries = this.keys.map((v, i) => {
      return [v, i];
    });
    return Object.fromEntries(entries);
  }
}
