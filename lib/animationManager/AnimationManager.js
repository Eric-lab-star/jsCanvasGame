"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.from-entries.js");
/**
 * animation manager is used to manage animation
 * information. animation informations are number of
 * frames used in animation and animation name.
 */
class AnimationManager {
  /**object of animation state */

  constructor(state) {
    this.state = state;
  }
  /**creates object in order like enum
   * in other languages*/
  enum() {
    const names = this.names();
    const entries = names.map((v, i) => {
      return [v, i];
    });
    return Object.fromEntries(entries);
  }
  frames() {
    return Object.values(this.state);
  }
  names() {
    return Object.keys(this.state);
  }
}
exports.default = AnimationManager;