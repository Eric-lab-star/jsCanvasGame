"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnimationManager {
    constructor(state) {
        this.state = state;
    }
    enum() {
        const names = this.names();
        const entries = names.map((v, i) => {
            return [v, i];
        });
        return Object.fromEntries(entries);
    }
    frames() {
        return Object.values(this.state);
    }
    names() {
        return Object.keys(this.state);
    }
}
exports.default = AnimationManager;
