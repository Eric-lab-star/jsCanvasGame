type stateObj = {
  [key: string]: number;
};
/**
 * animation manager is used to manage animation
 * information. animation informations are number of
 * frames used in animation and animation name.
 */
export default class AnimationManager {
  /**object of animation state */
  public state: stateObj;

  constructor(state: stateObj) {
    this.state = state;
  }

  /**creates object in order like enum
   * in other languages*/
  public enum(name: string) {
    const names = this.names();
    const entries = names.map((v, i) => {
      return [v, i];
    });
    const enumObj = Object.fromEntries(entries);
    return enumObj[name];
  }

  public frames() {
    return Object.values(this.state);
  }
  public names() {
    return Object.keys(this.state);
  }
}
