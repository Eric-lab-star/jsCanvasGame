export default class AnimationManager {
    constructor(state) {
        this.state = state;
        this.keys = Object.keys(state);
        this.values = Object.values(state);
        this.ordinal = this.enum();
    }
    enum() {
        const entries = this.keys.map((v, i) => {
            return [v, i];
        });
        return Object.fromEntries(entries);
    }
}
