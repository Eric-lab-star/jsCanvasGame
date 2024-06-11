import playerSprite from "../res/player_sprites.png";
import { randomColor } from "../utilz/helper";
import tileImage from "../res/tiles.svg";
export default class RenderTest {
  // private map: Level;
  // private captain: Captain;

  public constructor() {
    // this.map = new Level(levelJson as JsonTypes);
    // this.captain = new Captain();
  }

  public renderBackground() {
    const canvas = document.createElement("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.className = "background-canvas";
    const ctx = canvas.getContext("2d")!;
    const image = new Image();
    image.src = tileImage;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    // document.body.appendChild(canvas);
    return canvas;
  }

  public camera(background: HTMLCanvasElement) {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;
    canvas.className = "camera-canvas";
    document.body.appendChild(canvas);
    return canvas;
  }

  public cameraMove(camera: HTMLCanvasElement, background: HTMLCanvasElement) {
    const ctx = camera.getContext("2d")!;
    let yPos = 0;
    let xPos = 0;
    ctx.drawImage(
      background,
      0,
      0,
      camera.width,
      camera.height,
      0,
      0,
      camera.width,
      camera.height,
    );

    addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "a") {
        xPos -= 10;
      }
      if (e.key === "d") {
        xPos += 10;
      }
      if (e.key === "s") {
        yPos += 10;
      }
      if (e.key === "w") {
        yPos -= 10;
      }
      ctx.clearRect(0, 0, camera.width, camera.height);
      ctx.drawImage(
        background,
        xPos,
        yPos,
        camera.width,
        camera.height,
        0,
        0,
        camera.width,
        camera.height,
      );
    });
  }

  public playerImage() {
    const image = new Image();
    image.src = playerSprite;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx === null) {
        console.log("context is null");
        return;
      }
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(image, 0, 0, 64, 40, 0, 0, 64 * 3, 40 * 3);
      document.body.appendChild(canvas);
      addEventListener("keydown", (e: Event) => {});
    };
  }

  // level specific test worker
  public start() {
    const background = this.renderBackground();
    const camera = this.camera(background);
    this.cameraMove(camera, background);
    // this.map.render();
    // this.captain.render();
  }
}
