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
      opacity: 0,
    },
    label: "foundation",
  },
);
export const leftWall = Bodies.rectangle(67 / 2, 648 / 2, 67, 648, {
  label: "leftWall",
  isStatic: true,
  render: {
    fillStyle: randomColor(),
    opacity: 0,
  },
});
export const rightWall = Bodies.rectangle(
  GameEnv.GAME_WIDTH - 70 / 2,
  647 / 2,
  70,
  647,
  {
    label: "rightWall",
    isStatic: true,
    render: {
      fillStyle: randomColor(),
      opacity: 0,
    },
  },
);

const ceilling = Bodies.rectangle(1280 / 2, 69 / 2, 1280, 69, {
  isStatic: true,
  label: "ceilling",
  render: {
    fillStyle: randomColor(),
    opacity: 0,
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
      opacity: 0,
    },
  },
);

const ceilingPillar = Bodies.rectangle(897 + 124 / 2, 64 + 189 / 2, 124, 189, {
  isStatic: true,
  label: "ceilingPillar",
  render: {
    fillStyle: randomColor(),
    opacity: 0,
  },
});

const leftCorner = Bodies.rectangle(61 + 61 / 2, 63 + 63 / 2, 61, 63, {
  isStatic: true,
  label: "leftCorner",
  render: {
    fillStyle: randomColor(),
    opacity: 0,
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
      opacity: 0,
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
      opacity: 0,
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
      opacity: 0,
    },
  },
);

export function swingSword(
  pos: { x: number; y: number },
  collisionGroup: number,
  width: number,
) {
  return Bodies.rectangle(pos.x + width / 2, pos.y, 60, 10, {
    render: {
      fillStyle: randomColor(),
      opacity: 0,
    },
    isSensor: true,
    label: "swingSword",
    collisionFilter: {
      group: collisionGroup,
    },
    chamfer: { radius: 5 },
  });
}

export const playerHitBox = function () {
  return Bodies.rectangle(1000, 413, 40, 45, {
    render: {
      fillStyle: randomColor(),
      opacity: 1,
    },
    friction: 0.3,
    label: "hitBox",
  });
};

export const enemy = Bodies.rectangle(800, 513, 45, 45, {
  label: "enemy",
});

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
