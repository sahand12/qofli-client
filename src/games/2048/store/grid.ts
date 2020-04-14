import {
  CellSerializedType,
  CellType,
  GridSerializedType,
  GridType,
  PositionType,
  TileType
} from '../components/types';
import { cloneTile, createTile, serializeTile } from './tile';

// Build a grid of the specified size
function createGrid(size: number): GridType {
  return {
    size,
    cells: new Array(size).fill(new Array(size).fill(null))
  };
}

function cloneGrid(grid: GridType): GridType {
  return mapCells(grid, (x, y, cell) => {
    if (cell === null) {
      return cell;
    }
    return cloneTile(cell);
  });
}

// Build a grid from a previous state.
function createGridFromState(state: GridSerializedType): GridType {
  const { size, cells } = state;
  const newCells: CellType[][] = [];
  let rowArr: CellType[];
  let tile: CellSerializedType;

  for (let row = 0; row < size; row++) {
    rowArr = newCells[row] = [];
    for (let col = 0; col < size; col++) {
      tile = cells[row][col];
      rowArr.push(tile !== null ? createTile(tile.position, tile.value, tile.kind) : null);
    }
  }

  return { size, cells: newCells };
}

// Find the first available random position in a grid
function randomAvailableCell(grid: GridType): PositionType | undefined {
  const allEmptyCells = availableCells(grid);

  return allEmptyCells.length === 0
    ? undefined
    : allEmptyCells[Math.floor(Math.random() * allEmptyCells.length)];
}

function availableCells(grid: GridType): PositionType[] {
  const cells: PositionType[] = [];

  eachCell(grid, (row, col, tile) => {
    if (tile === null) {
      cells.push({ row, col });
    }
  });

  return cells;
}

// Callback for every cell
function eachCell(
  grid: GridType,
  callback: (row: number, col: number, tile: CellType) => void
): void {
  // col = x , row = y
  for (let row = 0; row < grid.size; row++) {
    for (let col = 0; col < grid.size; col++) {
      callback(row, col, grid.cells[row][col]);
    }
  }
}

function anyCellAvailable(grid: GridType): boolean {
  return availableCells(grid).length !== 0;
}

function thisCellAvailable(grid: GridType, cell: PositionType): boolean {
  return !thisCellOccupied(grid, cell);
}

function thisCellOccupied(grid: GridType, cell: PositionType): boolean {
  return cellContent(grid, cell) !== null;
}

function cellContent(grid: GridType, cell: PositionType): CellType {
  if (cellIsWithinBounds(grid, cell)) {
    return grid.cells[cell.row][cell.col];
  }
  return null;
}

function cellIsWithinBounds(grid: GridType, cell: PositionType): boolean {
  return cell.row >= 0 && cell.row < grid.size && cell.col >= 0 && cell.col < grid.size;
}

function insertTile(grid: GridType, tile: TileType): GridType {
  return mapCells(grid, (row: number, col: number, cell: CellType) => {
    if (tile.row === row && tile.col === col) {
      return tile;
    }
    return cell;
  });
}

function removeTile(grid: GridType, tile: TileType): GridType {
  return mapCells(grid, (row: number, col: number, cell: CellType) => {
    if (tile.row === row && tile.col === col) {
      return null;
    }
    return cell;
  });
}

function mapCells(
  grid: GridType,
  callback: (row: number, col: number, cell: CellType) => CellType
): GridType {
  return {
    ...grid,
    cells: grid.cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => callback(rowIndex, colIndex, cell))
    )
  };
}

function serialize(grid: GridType): GridSerializedType {
  const cellState: CellSerializedType[][] = [];
  let row: CellSerializedType[];
  let cell: CellType;

  for (let i = 0; i < grid.size; i++) {
    row = cellState[i] = [];
    for (let j = 0; j < grid.size; j++) {
      cell = grid.cells[i][j];
      row.push(cell === null ? null : serializeTile(cell));
    }
  }

  return { size: grid.size, cells: cellState };
}

export {
  cloneGrid,
  cellContent,
  cellIsWithinBounds,
  createGrid,
  createGridFromState,
  anyCellAvailable,
  randomAvailableCell,
  insertTile,
  eachCell,
  mapCells,
  thisCellAvailable,
  removeTile
};
