import { beforeEach, describe, expect, it, vi } from "vitest";
import Animation from "../animation/animation";
import AnimationManager from "../animationManager/AnimationManager";
vi.mock("../animationManager/AnimationManager", () => {
  const AnimationManager = vi.fn();
  AnimationManager.prototype.frames = vi.fn(() => [5, 6, 4, 3, 1, 2, 3, 3, 3]);
  return {
    default: AnimationManager,
  };
});

describe("define animation class methods", () => {
  let animation: Animation;
  let mockImage: any;
  beforeEach(() => {
    mockImage = { src: "", addEventListener: vi.fn() };
    (global as any).Image = vi.fn(() => mockImage);

    animation = new Animation(
      mockImage as HTMLImageElement,
      "../../res/player_sprites.png",
      { idle: 0 },
      100,
      100,
    );

    (global as any).createImageBitmap = vi.fn(async () => {});
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

  it("should call AnimationManager", () => {
    animation.loadAnimationSets();
    expect(AnimationManager).toHaveBeenCalled();
    expect(createImageBitmap).toHaveBeenCalled();
    expect(AnimationManager.prototype.frames).toHaveBeenCalled();

    //
  });
});
