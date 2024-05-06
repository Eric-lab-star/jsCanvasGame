"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyBoardInput {
    constructor(component) {
        this.component = component;
        addEventListener("keydown", (event) => this.move(event));
    }
    move(event) {
        switch (event.key) {
            case "d" || "D":
                this.component.update(this.component.speed, 0);
                break;
            case "a" || "A":
                this.component.update(-this.component.speed, 0);
                break;
            default:
                break;
        }
    }
}
exports.default = KeyBoardInput;
