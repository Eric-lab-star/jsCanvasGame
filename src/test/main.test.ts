import { expect, describe, it, vi } from "vitest";
import { setCanvasWidthHeight } from "../main/main";

describe("setCanvasWidthHeight()", () => {
  it("set canvas width and height", () => {
    const canvas = document.querySelector("canvas");
    if (canvas != null) {
      setCanvasWidthHeight(canvas);
      expect(canvas.width).toBe(innerWidth);
    }
  });
});
