class KeyBoardInput {
    constructor(component) {
        this.component = component;
        addEventListener("keydown", (event) => this.move(event));
    }
    move(event) {
        switch (event.key) {
            case "d" || "D":
                this.component.update(1, 0);
                break;
            case "a" || "A":
                this.component.update(-1, 0);
                break;
            default:
                break;
        }
    }
}
export default KeyBoardInput;
