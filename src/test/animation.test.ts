import { beforeEach, describe, expect, it } from "vitest";
import Animation from "../animation/animation";

describe("animation class", () => {
  let animation: Animation;
  beforeEach(() => {
    const img = new Image();

    animation = new Animation(
      img,
      "../../res/player_sprites.png",
      { idle: 0 },
      100,
      100,
    );
  });

  it("should be instance of Animation class", () => {
    expect(animation).toBeInstanceOf(Animation);
  });
  it("should have loadAnimationSets void method", () => {
    expect(animation.loadAnimationSets).toBeTypeOf("function");
  });

  it("should have loadAnimation method", () => {
    expect(animation).toHaveProperty("loadAnimation");
  });

  it("should have mapHandler method", () => {
    expect(animation).toHaveProperty("mapHandler");
  });

  it("should have createImageBitmap method", () => {
    expect(animation).toHaveProperty("createImageBitmap");
  });
});
