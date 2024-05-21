import { beforeEach, describe, expect, it, vi } from "vitest";
import Character from "../character/Character";
import Vector2d from "../utilz/Vector2d";
import Animation from "../animation/animation";
import { ctx } from "../mockingDOM/mockinDOM";

vi.mock("../animation/animation", () => {
  const Animation = vi.fn();
  Animation.prototype.loadAnimationSets = vi.fn();
  return { default: Animation };
});

describe("Character class", () => {
  let ch: Character;
  let mockImage: any;
  beforeEach(() => {
    if (ctx != null) {
      ch = new Character(ctx, new Vector2d(1, 2), 120, 120, [4], "");
    }

    mockImage = {
      addEventListener: vi.fn(),
    };

    (global as any).Image = vi.fn(() => mockImage);
  });

  it("should be instance of Character class", () => {
    expect(ch).toBeInstanceOf(Character);
  });

  it("should have handleAnimation method", () => {
    expect(ch).toHaveProperty("handleAnimation");
    const spy = vi.spyOn(ch, "handleAnimation");
    expect(typeof spy).toBe("function");
  });

  it("should have drawAnimation method", () => {
    expect(ch).toHaveProperty("drawAnimation");
    const spy = vi.spyOn(ch, "drawAnimation");
    expect(typeof spy).toBe("function");
  });

  it("should thorw error on drawAnimation method", () => {
    expect(ch).toHaveProperty("drawAnimation");
    const spy = vi.spyOn(ch, "drawAnimation");
    expect(() => ch.drawAnimation(1)).toThrowError(
      "need to set animation first",
    );
    expect(spy).toHaveBeenCalled();
  });

  it("should have setAnimation method", () => {
    expect(ch).toHaveProperty("setAnimation");
    const spy = vi.spyOn(ch, "setAnimation");
    expect(typeof spy).toBe("function");
  });

  it("should set animation", () => {
    ch.setAnimation();
    expect(Image).toHaveBeenCalled();
    expect(Animation).toHaveBeenCalled();

    expect(mockImage.addEventListener).toHaveBeenCalledWith(
      "load",
      expect.any(Function),
      { once: true, passive: false },
    );

    const handler = mockImage.addEventListener.mock.calls[0][1];
    handler();
    expect(Animation.prototype.loadAnimationSets).toHaveBeenCalled();
  });
});
