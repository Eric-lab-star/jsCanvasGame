export default class GameEnv {
  constructor() {}
  public static TILE_SIZE: number = 32;
  public static MAP_COLUMNS: number = 40;
  public static MAP_ROWS: number = 25;
  public static TILES_MAP_COLUMNS: number = 17;
  public static GAME_WIDTH: number = this.TILE_SIZE * this.MAP_COLUMNS;
  public static GAME_HEIGHT: number = this.TILE_SIZE * this.MAP_ROWS;
  public static TERRAIN_TILE: string = "./res/terrain.png";
  public static BASIC_LEVEL_JSON: string = "./res/basic.json";
}
