import Character from "../src/character/Character";
import Vector2d from "../src/modules/Vector2d";
import { playerStates } from "../src/character/Capatain";

test("test character", () => {
  const canvase = document.createElement("canvas");
  const pos = new Vector2d(1, 1);
  const ctx = canvase.getContext("2d");
  if (ctx != null) {
    const ch = new Character(ctx, pos, 100, 100, playerStates, "");
    expect(ch).not.toBeNull();
  }
});
