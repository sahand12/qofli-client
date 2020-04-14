import { buildTraversals } from './traversals';
import {
  CellType,
  GameStateType,
  GridType,
  PositionType,
  TileType,
  VectorType
} from '../components/types';

import {
  anyCellAvailable,
  cellContent,
  cellIsWithinBounds,
  cloneGrid,
  createGrid,
  insertTile,
  randomAvailableCell,
  removeTile,
  thisCellAvailable
} from './grid';
import { createTile, stillTile, mergeTiles, moveTile } from './tile';

type Direction = 'left' | 'right' | 'up' | 'down';
export const VECTOR_MAP: { [key: number]: VectorType } = {
  0: { dRow: -1, dCol: 0 }, // up
  1: { dRow: 0, dCol: 1 }, // right
  2: { dRow: 1, dCol: 0 }, // down
  3: { dRow: 0, dCol: -1 } // left
};

function startGame(gridSize: number, startTiles: number): GameStateType {
  return {
    score: 0,
    startedAt: Date.now(),
    turn: 0,
    over: false,
    grid: addStartTiles(createGrid(gridSize), startTiles)
  };
}

// move tiles on the grid in the specified direction
function processMove(
  grid: GridType,
  dir: number
): { moved: boolean; grid: GridType; moveScore: number } {
  let moveScore = 0;
  let moved = false;
  const displacementVector: VectorType = getVector(dir);

  const traversals = buildTraversals(dir, grid.size);
  let position: PositionType;
  let cell: CellType;
  let nextGrid = createGrid(grid.size);
  let newTile: TileType;

  // Traverse the grid in the right direction and move tiles

  traversals.forEach(({ row, col }) => {
    position = { row, col };
    cell = cellContent(grid, position);

    if (cell !== null) {
      const { farthest, next } = findFarthestPosition(nextGrid, position, displacementVector);
      const nextCell = cellContent(nextGrid, next);

      // only situation where we consider the next cell
      if (nextCell !== null && nextCell.kind !== 'merged' && nextCell.value === cell.value) {
        newTile = mergeTiles(nextCell, cell, next);
        nextGrid = removeTile(nextGrid, nextCell);
        moved = true;
      }
      // ignore nextCell
      else {
        if (samePosition(farthest, position)) {
          newTile = stillTile(cell);
        } else {
          newTile = moveTile(cell, farthest);
          moved = true;
        }
      }

      // update the grid
      nextGrid = insertTile(nextGrid, newTile);
    }
  });

  return {
    grid: moved ? addRandomTile(nextGrid) : nextGrid,
    moved,
    moveScore
  };
}

function samePosition(pos1: PositionType, pos2: PositionType) {
  return pos1.row === pos2.row && pos1.col === pos2.col;
}
function movesAvailable(grid: GridType): boolean {
  return anyCellAvailable(grid) || tileMatchesAvailable(grid);
}
// Check for available matches between tiles (more expensive check)
function tileMatchesAvailable(grid: GridType): boolean {
  let cell: CellType;
  const { size } = grid;
  let vector: VectorType;
  let adjacentPosition: PositionType;
  let adjacentCell: CellType;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      cell = cellContent(grid, { row, col });

      if (cell == null) {
        return true;
      }

      for (let direction = 0; direction < 4; direction++) {
        vector = getVector(direction);
        adjacentPosition = { row: row + vector.dRow, col: col + vector.dCol };
        adjacentCell = cellContent(grid, adjacentPosition);

        if (adjacentCell !== null && adjacentCell.value === cell.value) {
          return true; // These two tiles can be merged.
        }
      }
    }
  }

  return false;
}
function getVector(dir: number): VectorType {
  return VECTOR_MAP[dir];
}

function findFarthestPosition(
  grid: GridType,
  cell: PositionType,
  vector: VectorType
): {
  farthest: PositionType;
  next: PositionType;
} {
  let previous;

  // Progress toward the vector direction until an obstacle is found
  do {
    previous = cell;
    cell = { row: previous.row + vector.dRow, col: previous.col + vector.dCol };
  } while (cellIsWithinBounds(grid, cell) && thisCellAvailable(grid, cell));

  return {
    farthest: previous,
    next: cell // used to check if a merge is required
  };
}

function addStartTiles(grid: GridType, count: number): GridType {
  for (let i = 0; i < count; i++) {
    grid = addRandomTile(grid);
  }

  return grid;
}
function addRandomTile(grid: GridType): GridType {
  const position = randomAvailableCell(grid);

  if (position) {
    return insertTile(grid, createTile(position, randomTileValue(), 'new'));
  }
  return grid;
}
function randomTileValue(): number {
  return Math.random() < 0.9 ? 2 : 4;
}
function isGameTerminated(state: GameStateType): boolean {
  return state.over;
}

export { processMove, getVector, buildTraversals, startGame, findFarthestPosition };
