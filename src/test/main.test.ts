import { expect, describe, it, vi } from "vitest";
import { setCanvasWidthHeight } from "../main/main";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const {
  window: { document },
} = new JSDOM(
  `
<!doctype html>
<html lang="en">
    <canvas></canvas>
  </body>
</html> `,
  { pretendToBeVisual: true },
);

describe("setCanvasWidthHeight()", () => {
  it("set canvas width and height", () => {
    const canvas = document.querySelector("canvas");
    if (canvas != null) {
      setCanvasWidthHeight(canvas);
      expect(canvas.height).toBe(innerHeight);
      expect(canvas.width).toBe(innerWidth);
    }
  });
});
