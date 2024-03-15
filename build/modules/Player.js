var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Circle } from "./Circle.js";
var defaultProps = {
    x: 0,
    y: 0,
    radius: 30,
    color: "red",
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(ctx, props) {
        if (props === void 0) { props = defaultProps; }
        return _super.call(this, ctx, props) || this;
    }
    return Player;
}(Circle));
export { Player };
//# sourceMappingURL=Player.js.map