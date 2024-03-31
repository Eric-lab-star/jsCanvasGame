import { Circle } from "./Circle.js";
class Player extends Circle {
    constructor(ctx, x = 0, y = 0, radius = 20, color = "black") {
        super(ctx, x, y, radius, color);
    }
}
export { Player };
