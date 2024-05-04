type stateObj = {
  [key: string]: number;
};
/**
 * Class definition
 *
 * AnimationManager is alternative for enum.
 * This class is used to handle animtation tag
 * and number of frames of each tag.
 */
export default class AnimationManager {
  /**object of animation state */
  public state: stateObj;
  /**Array of names of tag */
  public keys: string[];
  /**Array of total number of frames*/
  public values: number[];

  /**Ordinal returns order of tag, passed
   * to parameters
   * */
  public ordinal: { [key: string]: number };

  constructor(state: stateObj) {
    this.state = state;
    this.keys = Object.keys(state);
    this.values = Object.values(state);
    this.ordinal = this.enum();
  }
  /**creates object in order like enum
   * in other languages*/
  private enum() {
    const entries = this.keys.map((v, i) => {
      return [v, i];
    });
    return Object.fromEntries(entries);
  }
}
