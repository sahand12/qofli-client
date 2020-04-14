import { GridType } from '../components/types';
import { createTile } from './tile';
import { eachCell } from './grid';

function arrayToGrid(array: number[][]): GridType {
  const len = array.length;
  const grid: GridType = { size: len, cells: [] };
  let cell;

  for (let row = 0; row < len; row++) {
    grid.cells[row] = [];
    for (let col = 0; col < len; col++) {
      cell = array[row][col];
      grid.cells[row][col] = cell === 0 ? null : createTile({ row, col }, cell, 'new');
    }
  }
  return grid;
}

function gridToArray(grid: GridType): number[][] {
  const array: number[][] = [];

  eachCell(grid, (row, col, cell) => {
    array[row] = array[row] || [];
    array[row][col] = cell === null ? 0 : cell.value;
  });

  return array;
}

export { arrayToGrid, gridToArray };
