import { Circle } from "./Circle.js";
const defaultProps = {
    x: 0,
    y: 0,
    radius: 30,
    color: "red",
};
class Player extends Circle {
    constructor(ctx, props = defaultProps) {
        super(ctx, props);
    }
}
export { Player };
//# sourceMappingURL=Player.js.map