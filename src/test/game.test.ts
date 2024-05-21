import { describe, expect, it } from "vitest";
import Game from "../main/game";
import { ctx } from "../mockingDOM/mockinDOM";

describe("Game Class", () => {
  it("should start game", () => {
    const game = new Game(ctx!);
    expect(game).toBeInstanceOf(Game);
  });
});
