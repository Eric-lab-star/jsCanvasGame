import jsdom from "jsdom";

const { JSDOM } = jsdom;
export const { window } = new JSDOM(
  `
<!doctype html>
<html lang="en">
    <canvas></canvas>
  </body>
</html> `,
);

export const canvas = window.document.querySelector("canvas");
export const ctx = canvas!.getContext("2d");
