import { Bodies } from "matter-js";
import GameEnv from "../env/GameEnv";
import { randomColor } from "./helper";
import TextureSensorBody from "./TextureSensorBody";
//
///
import ShipHelm1 from "../res/world/64px/ShipHelm/Ship Helm Idle 01.png";
import ShipHelm2 from "../res/world/64px/ShipHelm/Ship Helm Idle 02.png";
import ShipHelm3 from "../res/world/64px/ShipHelm/Ship Helm Idle 03.png";
import ShipHelm4 from "../res/world/64px/ShipHelm/Ship Helm Idle 04.png";
import ShipHelm5 from "../res/world/64px/ShipHelm/Ship Helm Idle 05.png";
import ShipHelm6 from "../res/world/64px/ShipHelm/Ship Helm Idle 06.png";
///
import Flag1 from "../res/world/64px/Flag/Flag 01.png";
import Flag2 from "../res/world/64px/Flag/Flag 02.png";
import Flag3 from "../res/world/64px/Flag/Flag 03.png";
import Flag4 from "../res/world/64px/Flag/Flag 04.png";
import Flag5 from "../res/world/64px/Flag/Flag 05.png";
import Flag6 from "../res/world/64px/Flag/Flag 06.png";
import Flag7 from "../res/world/64px/Flag/Flag 07.png";
import Flag8 from "../res/world/64px/Flag/Flag 08.png";
import Flag9 from "../res/world/64px/Flag/Flag 09.png";
///
import FlagPlatFormImage from "../res/world/64px/Flag/Platform.png";
///
import Chest1 from "../res/world/64px/Chest/Chest Open 01.png";
import Chest2 from "../res/world/64px/Chest/Chest Open 02.png";
import Chest3 from "../res/world/64px/Chest/Chest Open 03.png";
import Chest4 from "../res/world/64px/Chest/Chest Open 04.png";
import Chest5 from "../res/world/64px/Chest/Chest Open 05.png";
import Chest6 from "../res/world/64px/Chest/Chest Open 06.png";
import Chest7 from "../res/world/64px/Chest/Chest Open 07.png";
import Chest8 from "../res/world/64px/Chest/Chest Open 08.png";
import Chest9 from "../res/world/64px/Chest/Chest Open 09.png";
import Chest10 from "../res/world/64px/Chest/Chest Open 10.png";
///

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

export const shipHelm = new TextureSensorBody(
  "shipHelm",
  [ShipHelm1, ShipHelm2, ShipHelm3, ShipHelm4, ShipHelm5, ShipHelm6],
  297,
  320,
  66,
  67,
);

export const flag = new TextureSensorBody(
  "flag",
  [Flag1, Flag2, Flag3, Flag4, Flag5, Flag6, Flag7, Flag8, Flag9],
  730,
  270,
  100,
  179,
);

export class FlagPlatForm {
  public body: Matter.Body;
  constructor() {
    this.body = Bodies.rectangle(720 + 64 / 2, 351 + 35 / 2, 64, 35, {
      isStatic: true,
      label: "flagPlatForm",
      render: {
        opacity: 1,
        sprite: {
          texture: FlagPlatFormImage,
          xScale: 2,
          yScale: 2,
        },
      },
    });
  }
}

export const treasureBox = new TextureSensorBody(
  "treasuerBox",
  [
    Chest1,
    Chest2,
    Chest3,
    Chest4,
    Chest5,
    Chest6,
    Chest7,
    Chest8,
    Chest9,
    Chest10,
  ],
  90,
  580,
  137,
  53,
);

export const getWorldEelement = () => {
  const flagPlatForm = new FlagPlatForm();
  return [
    flagPlatForm.body,
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
