import { expect, describe, it } from "vitest";
import { ctxGetter, runner, setCanvasWidthHeight } from "../main/runner";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const { window } = new JSDOM(
  `
<!doctype html>
<html lang="en">
    <canvas></canvas>
  </body>
</html> `,
);

const canvas = window.document.querySelector("canvas");

describe("setCanvasWidthHeight()", () => {
  it("test canvas width and height", () => {
    if (canvas != null) {
      setCanvasWidthHeight(canvas);
      expect(canvas).toMatchObject({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  });
});

describe("ctxGetter()", () => {
  it("return ctx", () => {
    if (canvas != null) {
      expect(ctxGetter(canvas)).toEqual(canvas.getContext("2d"));
    }
  });
});

describe("runner()", () => {
  it("starts game", () => {
    if (canvas == null) {
      expect(runner(canvas)).toThrowError();
    }
  });
});
