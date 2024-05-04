export default class AnimationManager {
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
