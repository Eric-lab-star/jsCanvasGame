import { Bodies } from "matter-js";
import GameEnv from "../env/GameEnv";
import { randomColor } from "./helper";

export const foundation = Bodies.rectangle(
  GameEnv.GAME_WIDTH / 2,
  642 + 163 / 2,
  1280,
  163,
  {
    isStatic: true,
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
    label: "foundation",
  },
);
const leftWall = Bodies.rectangle(67 / 2, 648 / 2, 67, 648, {
  label: "leftWall",
  isStatic: true,
  render: {
    fillStyle: randomColor(),
    opacity: 1,
  },
});
const rightWall = Bodies.rectangle(
  GameEnv.GAME_WIDTH - 70 / 2,
  647 / 2,
  70,
  647,
  {
    label: "rightWall",
    isStatic: true,
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
  },
);

const ceilling = Bodies.rectangle(1280 / 2, 69 / 2, 1280, 69, {
  isStatic: true,
  label: "ceilling",
  render: {
    fillStyle: randomColor(),
    opacity: 1,
  },
});

export const foundationPillar = Bodies.rectangle(
  257 + 191 / 2,
  386 + 259 / 2,
  191,
  259,
  {
    isStatic: true,
    label: "foundationPillar",
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
  },
);

const ceilingPillar = Bodies.rectangle(897 + 124 / 2, 64 + 189 / 2, 124, 189, {
  isStatic: true,
  label: "ceilingPillar",
  render: {
    fillStyle: randomColor(),
    opacity: 1,
  },
});

const leftCorner = Bodies.rectangle(61 + 61 / 2, 63 + 63 / 2, 61, 63, {
  isStatic: true,
  label: "leftCorner",
  render: {
    fillStyle: randomColor(),
    opacity: 1,
  },
});

export const floatingPlatform = Bodies.rectangle(
  133 + 60 / 2,
  387 + 60 / 2,
  60,
  60,
  {
    isStatic: true,
    label: "floatingPlatform",
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
  },
);

export const floatingPlatform2 = Bodies.rectangle(
  640 + 256 / 2,
  449 + 63 / 2,
  256,
  63,
  {
    isStatic: true,
    label: "floatingPlatform2",
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
  },
);

export const floatingPlatform3 = Bodies.rectangle(
  1090 + 62 / 2,
  513 + 63 / 2,
  62,
  63,
  {
    isStatic: true,
    label: "floatingPlatform3",
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
  },
);

export const getWorldEelement = () => {
  return [
    foundationPillar,
    foundation,
    leftWall,
    rightWall,
    ceilling,
    leftCorner,
    ceilingPillar,
    floatingPlatform,
    floatingPlatform2,
    floatingPlatform3,
  ];
};
