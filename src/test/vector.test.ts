import { beforeEach, describe, expect, it } from "vitest";
import Vector2d from "../utilz/Vector2d";

describe("vector2d", () => {
  let vect: Vector2d;
  beforeEach(() => {
    vect = new Vector2d(10, 10);
  });

  it("should have update method", () => {
    expect(vect).toHaveProperty("update");
    expect(vect.update).toBeTypeOf("function");
  });

  it("should have x and y properties", () => {
    expect(vect).toEqual({ x: 10, y: 10 });
  });
});
