import shortid from 'shortid';
import { PositionType, TileKindType, TileSerializedType, TileType } from '../components/types';

function createTile(position: PositionType, value: number, kind: TileKindType): TileType {
  return {
    id: shortid(),
    row: position.row,
    col: position.col,
    kind,
    value,
    prev: null,
    mergedFrom: null
  };
}

function cloneTile(tile: TileType): TileType {
  return { ...tile };
}

function moveTile(tile: TileType, position: PositionType, isDead = false): TileType {
  return {
    ...tile,
    ...position,
    mergedFrom: null,
    prev: { row: tile.row, col: tile.col },
    kind: isDead ? 'dead' : 'moved'
  };
}

function dieTile(tile: TileType, position: PositionType): TileType {
  return moveTile(tile, position, true);
}

function stillTile(tile: TileType): TileType {
  return { ...tile, kind: 'still', prev: null, mergedFrom: null };
}

function mergeTiles(tile1: TileType, tile2: TileType, position: PositionType): TileType {
  if (tile1.value !== tile2.value) {
    throw new Error(
      `can not merge two tiles with different values: \ntile1: ${tile1}, \ntile2: ${tile2}`
    );
  }
  return {
    ...createTile(position, tile1.value * 2, 'merged'),
    mergedFrom: [dieTile(tile1, position), dieTile(tile2, position)]
  };
}

function serializeTile(tile: TileType): TileSerializedType {
  return {
    position: { row: tile.row, col: tile.col },
    value: tile.value,
    kind: 'still'
  };
}

export { cloneTile, createTile, moveTile, dieTile, mergeTiles, stillTile, serializeTile };
