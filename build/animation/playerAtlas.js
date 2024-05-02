class PlayerAtlas {
    constructor() { }
    static parser(state, img) {
        const imgs = [];
        for (let i = 0; i < state; i++) {
            imgs.push(createImageBitmap(img, PlayerAtlas.imgWidth * i, 0, PlayerAtlas.imgWidth, PlayerAtlas.imgHeight, PlayerAtlas.opt));
        }
        return imgs;
    }
}
PlayerAtlas.idle = 5;
PlayerAtlas.jump1 = 6;
PlayerAtlas.jump2 = 3;
PlayerAtlas.fall = 1;
PlayerAtlas.hit1 = 2;
PlayerAtlas.hit2 = 3;
PlayerAtlas.attack1 = 3;
PlayerAtlas.attack2 = 3;
PlayerAtlas.attack3 = 3;
PlayerAtlas.totalStates = 9;
PlayerAtlas.imgHeight = 40;
PlayerAtlas.imgWidth = 64;
PlayerAtlas.scale = 2;
PlayerAtlas.opt = {
    resizeWidth: PlayerAtlas.imgWidth * PlayerAtlas.scale,
    resizeHeight: PlayerAtlas.imgHeight * PlayerAtlas.scale,
    resizeQuality: "pixelated",
};
export default PlayerAtlas;
