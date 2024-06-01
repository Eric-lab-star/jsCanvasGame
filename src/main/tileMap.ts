export default class TileMapProps {
  private static MAP_COLUMNS: number = 40;
  private static MAP_ROWS: number = 25;
  private static TILE_SIZE: number = 32;
  private static TILES_MAP_COLUMNS: number = 17;

  constructor() {}
  public getTileSize() {
    return TileMapProps.TILE_SIZE;
  }

  public getTilesMapColumns() {
    return TileMapProps.TILES_MAP_COLUMNS;
  }

  public getMapColumns() {
    return TileMapProps.MAP_COLUMNS;
  }

  public getMapRows() {
    return TileMapProps.MAP_ROWS;
  }
  /**
   *
   */
}
