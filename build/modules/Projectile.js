import Circle from "./Circle.js";
class Projectile extends Circle {
    constructor(ctx, pos, radius = 20, color = "black") {
        super(ctx, pos, radius, color);
    }
}
export { Projectile };
