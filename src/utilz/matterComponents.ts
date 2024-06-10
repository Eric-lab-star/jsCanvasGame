import { Bodies } from "matter-js";
import GameEnv from "../env/GameEnv";
import TileMapProps from "../levels/tileMap";
import { randomColor } from "./helper";

const dummie = Bodies.rectangle(400, 20, 80, 80);
const ground = Bodies.rectangle(
  GameEnv.GAME_WIDTH / 2,
  GameEnv.GAME_HEIGHT,
  GameEnv.GAME_WIDTH,
  40,
  {
    isStatic: true,
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
    label: "ground",
  },
);
const leftWall = Bodies.rectangle(
  0,
  GameEnv.GAME_HEIGHT / 2,
  40,
  GameEnv.GAME_HEIGHT,
  {
    label: "leftWall",
    isStatic: true,
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
  },
);
const rightWall = Bodies.rectangle(
  GameEnv.GAME_WIDTH,
  GameEnv.GAME_HEIGHT / 2,
  40,
  GameEnv.GAME_HEIGHT,
  {
    label: "rightWall",
    isStatic: true,
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
  },
);

const topWall = Bodies.rectangle(
  GameEnv.GAME_WIDTH / 2,
  0,
  GameEnv.GAME_WIDTH,
  40,
  {
    isStatic: true,
    label: "topWall",
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
  },
);

const base = Bodies.rectangle(
  GameEnv.GAME_WIDTH / 2,
  GameEnv.GAME_HEIGHT - 2 * TileMapProps.TILE_SIZE,
  GameEnv.GAME_WIDTH,
  4 * TileMapProps.TILE_SIZE,
  {
    isStatic: true,
    label: "base",
    render: {
      opacity: 1,
    },
  },
);

const getWorldEelement = () => {
  return [ground, leftWall, rightWall, topWall];
};

export { base, dummie, ground, leftWall, rightWall, topWall, getWorldEelement };
