import HitBoxEvent from "../src/Events/HitBoxEvents";
declare global {
  interface GlobalEventHandlersEventMap {
    "hitBoxEvent": HitBoxEvent;
  }
}
