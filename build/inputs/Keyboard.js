class Input {
    constructor(component) {
        this.component = component;
        this.dx = 1;
        this.dy = 1;
    }
    Keyboard() {
        addEventListener("keydown", this.keyDownHandler.bind(this));
        addEventListener("keyup", this.keyUpHandler.bind(this));
        return;
    }
    keyDownHandler(event) {
        switch (event.key) {
            case "w":
                break;
            case "a":
                this.component.setX(-this.dx);
                console.log("move left");
                break;
            case "s":
                console.log("down");
                break;
            case "d":
                this.component.setX(this.dx);
                this.component.update();
                console.log("pressed d");
                break;
        }
    }
    keyUpHandler(event) {
        switch (event.key) {
            case "w":
                break;
            case "a":
                this.component.setX(-this.dx);
                console.log("move left");
                break;
            case "s":
                console.log("down");
                break;
            case "d":
                this.component.setX(this.dx);
                console.log("up d");
                break;
        }
    }
}
export { Input };
//# sourceMappingURL=Keyboard.js.map