import { describe, expect, it } from "vitest";
import Game from "../main/game";

import jsdom from "jsdom";
const { JSDOM } = jsdom;
const { window } = new JSDOM(
  `
<!doctype html>
<html lang="en">
    <canvas></canvas>
  </body>
</html> `,
  { pretendToBeVisual: true },
);

const canvas = window.document.querySelector("canvas");

describe("Game class", () => {
  it("creates game", () => {
    let ctx;
    if (canvas != null) {
      ctx = canvas.getContext("2d");
    }
    if (ctx != null) {
      const game = new Game(ctx);

      expect(game).toBeInstanceOf(Game);
    }
  });

  it("spyon loop");
});
