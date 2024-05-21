import { expect, describe, it, vi } from "vitest";
import { ctxGetter, setCanvasWidthHeight } from "../main/runner";
import { canvas } from "../mockingDOM/mockinDOM";

describe("setCanvasWidthHeight()", () => {
  it("should set canvas width and height to match innerwidth and innerHeight", () => {
    setCanvasWidthHeight(canvas!);
    expect(canvas).toMatchObject({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });
});

describe("ctxGetter", () => {
  it("should throw an error if canvas API is not supported", () => {
    // Mock getContext to simulate a browser that doesn't support the canvas API
    const nullFn = vi.fn(() => null);
    canvas!.getContext = nullFn;
    expect(() => ctxGetter(canvas!)).toThrowError(
      "canvas api is not supported",
    );
    expect(nullFn).toHaveBeenCalled();
  });
});
