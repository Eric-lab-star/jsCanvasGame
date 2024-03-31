class Input {
    constructor(component) {
        this.xSpeed = 10;
        this.ySpeed = 10;
        this.component = component;
    }
    Keyboard() {
        addEventListener("keydown", this.keyDownHandler.bind(this));
        return;
    }
    keyDownHandler(event) {
        switch (event.key) {
            case "w":
                this.component.setY(-this.ySpeed);
                this.component.update();
                break;
            case "a":
                this.component.setX(-this.xSpeed);
                this.component.update();
                break;
            case "s":
                this.component.setY(+this.ySpeed);
                this.component.update();
                console.log("down");
                break;
            case "d":
                this.component.setX(+this.xSpeed);
                this.component.update();
                break;
        }
    }
}
export { Input };
