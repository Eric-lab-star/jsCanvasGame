import { Bodies } from "matter-js";
import GameEnv from "../env/GameEnv";

const dummie = Bodies.rectangle(400, 20, 80, 80);
const ground = Bodies.rectangle(
  GameEnv.GAME_WIDTH / 2,
  GameEnv.GAME_HEIGHT,
  GameEnv.GAME_WIDTH,
  40,
  {
    isStatic: true,
    render: {
      opacity: 0,
    },
  },
);
const leftWall = Bodies.rectangle(
  0,
  GameEnv.GAME_HEIGHT / 2,
  40,
  GameEnv.GAME_HEIGHT,
  {
    isStatic: true,
    render: {
      opacity: 0,
    },
  },
);
const rightWall = Bodies.rectangle(
  GameEnv.GAME_WIDTH,
  GameEnv.GAME_HEIGHT / 2,
  40,
  GameEnv.GAME_HEIGHT,
  {
    isStatic: true,
    render: {
      opacity: 0,
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
    render: {
      opacity: 0,
    },
  },
);

export { dummie, ground, leftWall, rightWall, topWall };
