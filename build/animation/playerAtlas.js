class PlayerAnimation {
    constructor() { }
    static parser(x, y, img) {
        const imgs = [];
        for (let i = 0; i < x; i++) {
            imgs.push(createImageBitmap(img, PlayerAnimation.imgWidth * i, PlayerAnimation.imgHeight * y, PlayerAnimation.imgWidth, PlayerAnimation.imgHeight, PlayerAnimation.opt));
        }
        return imgs;
    }
}
PlayerAnimation.idle = 0;
PlayerAnimation.jump1 = 1;
PlayerAnimation.jump2 = 2;
PlayerAnimation.fall = 3;
PlayerAnimation.hit1 = 4;
PlayerAnimation.hit2 = 5;
PlayerAnimation.attack1 = 6;
PlayerAnimation.attack2 = 7;
PlayerAnimation.attack3 = 8;
PlayerAnimation.states = [5, 6, 3, 1, 2, 3, 3, 3, 3];
PlayerAnimation.imgHeight = 40;
PlayerAnimation.imgWidth = 64;
PlayerAnimation.scale = 2;
PlayerAnimation.opt = {
    resizeWidth: PlayerAnimation.imgWidth * PlayerAnimation.scale,
    resizeHeight: PlayerAnimation.imgHeight * PlayerAnimation.scale,
    resizeQuality: "pixelated",
};
export default PlayerAnimation;
