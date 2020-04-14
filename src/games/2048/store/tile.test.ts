import { inspect } from 'util';
import { createTile, serializeTile, moveTile, dieTile, mergeTiles } from './tile';

describe('Tile Type test', () => {
  test('creates a tile correctly and all the props exist', () => {
    const tilePosition = { row: 2, col: 0 };
    const tile = createTile(tilePosition, 4, 'new');

    expect(tile).toMatchObject({
      row: 2,
      col: 0,
      kind: 'new',
      value: 4,
      prev: null,
      mergedFrom: null
    });
  });

  test('move a tile to a new position', () => {
    const tile = createTile({ row: 1, col: 2 }, 2, 'new');
    const newPosition = { row: 1, col: 3 };
    const movedTile = moveTile(tile, newPosition);

    expect(movedTile).toEqual({
      id: tile.id,
      row: newPosition.row,
      col: newPosition.col,
      kind: 'moved',
      value: 2,
      prev: { row: tile.row, col: tile.col },
      mergedFrom: null
    });
  });

  test('make a dead tile', () => {
    const tile = createTile({ row: 1, col: 0 }, 128, 'moved');
    const newPos = { row: 3, col: 0 };
    const deadTile = dieTile(tile, newPos);

    expect(deadTile).toEqual({
      id: tile.id,
      row: newPos.row,
      col: newPos.col,
      kind: 'dead',
      value: 128,
      prev: { row: tile.row, col: tile.col },
      mergedFrom: null
    });
  });

  test('merge two tiles together', () => {
    const tile1 = createTile({ row: 1, col: 2 }, 128, 'new');
    const tile2 = createTile({ row: 1, col: 3 }, 128, 'new');
    const newPosition = { row: 0, col: 3 };
    const deadTile1 = dieTile(tile1, newPosition);
    const deadTile2 = dieTile(tile2, newPosition);
    const mergedTile = mergeTiles(tile1, tile2, newPosition);

    expect(mergedTile).toMatchObject({
      row: newPosition.row,
      col: newPosition.col,
      kind: 'merged',
      value: 256,
      prev: null,
      mergedFrom: [deadTile1, deadTile2]
    });
  });
});
