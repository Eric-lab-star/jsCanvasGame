import Vector2d from "../src/modules/Vector2d";

test("test Vector2d", () => {
  const pos = new Vector2d(1, 1);
  pos.update(1, 1);
  expect(pos.x).toBe(2);
  expect(pos.y).toBe(2);
});
