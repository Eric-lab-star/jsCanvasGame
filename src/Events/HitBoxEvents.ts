export default class HitBoxEvent extends Event {
  public message: string = "";
  public name: string = "hitbox";
  constructor(type: string, initOpt?: EventInit) {
    super(type, initOpt);
  }
}
