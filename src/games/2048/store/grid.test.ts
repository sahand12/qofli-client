import { createGrid } from './grid';
import { arrayToGrid, gridToArray } from './grid.helpers';

describe('Grid Type test', () => {
  test('creates a grid correctly and all the props exist', () => {
    const grid = createGrid(4);
    expect(grid).toEqual({
      size: 4,
      cells: new Array(4).fill(new Array(4).fill(null))
    });
  });

  test('arrayToGrid()', () => {
    // prettier-ignore
    const array = [
      [0, 2, 4, 0],
      [0, 0, 8, 16],
      [1024, 256, 16, 8],
      [0, 0, 2, 2]
    ];

    expect(gridToArray(arrayToGrid(array))).toEqual(array);
  });
});
