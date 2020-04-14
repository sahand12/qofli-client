import {
  buildTraversals,
  findFarthestPosition,
  getVector,
  processMove,
  startGame,
  VECTOR_MAP
} from './engine';
import { arrayToGrid, gridToArray } from './grid.helpers';
import { forEach } from 'ramda';

describe('2048 engine test', () => {
  test('startGame function', () => {
    const initialGameState = startGame(4, 2);
    expect(initialGameState.grid.cells).toHaveLength(4);
    expect(initialGameState).toMatchObject({
      score: 0,
      turn: 0,
      over: false
    });
  });
  test('buildTraversal function', () => {});
  test('processMove function', () => {
    // prettier-ignore
    const array = [
      [0, 2, 2, 4],
      [4, 4, 8, 8],
      [2, 4, 4, 2],
      [0, 0, 0, 0],
    ];
    // prettier-ignore
    const map = {
      left: [
        [4, 4, 0, 0],
        [8, 16, 0, 0],
        [2, 8, 2, 0],
        [0, 0, 0, 0]
      ],
      right: [
        [0, 0, 4, 4],
        [0, 0, 8, 16],
        [0, 2, 8, 2],
        [0, 0, 0, 0],
      ],
      up:[
        [4, 2, 2, 4],
        [2, 8, 8, 8],
        [0, 0, 4, 2],
        [0, 0, 0, 0],
      ],
      down: [
        [0, 0, 0, 0],
        [0, 0, 2, 4],
        [4, 2, 8, 8],
        [2, 8, 4, 2],
      ],
    };
    const grid = arrayToGrid(array);
    const toLeft = processMove(grid, 3);
    const toRight = processMove(grid, 1);
    const toUp = processMove(grid, 0);
    const toDown = processMove(grid, 2);

    // printGrid(grid);
    // forEach(to => printGrid(to.grid), [toLeft, toRight, toDown, toUp]);
    expect(gridToArray(toLeft.grid)).toEqual(map.left);
    expect(gridToArray(toRight.grid)).toEqual(map.right);
    expect(gridToArray(toUp.grid)).toEqual(map.up);
    expect(gridToArray(toDown.grid)).toEqual(map.down);
  });
  test('findFarthestPosition()', () => {
    // prettier-ignore
    const array = [
      [0, 2, 2, 4],
      [4, 4, 8, 8],
      [2, 4, 4, 2],
      [0, 0, 0, 0],
    ];
    const grid = arrayToGrid(array);
    const downVector = getVector(2);
    // prettier-ignore
    const positions = [
      { pos: { row: 2, col: 0 }, positions: {farthest: {row: 3, col: 0}, next: {row: 4, col:0}} },
      { pos: { row: 1, col: 0 }, positions: {farthest: {row: 2, col: 0}, next: {row: 3, col:0}} },

      { pos: { row: 2, col: 1 }, positions: {farthest: {row: 3, col: 1}, next: {row: 4, col:1}} },
      { pos: { row: 1, col: 1 }, positions: {farthest: {row: 2, col: 1}, next: {row: 3, col:1}} },
      { pos: { row: 0, col: 1 }, positions: {farthest: {row: 1, col: 1}, next: {row: 2, col:1}} },

      { pos: { row: 2, col: 2 }, positions: {farthest: {row: 3, col: 2}, next: {row: 4, col:2}} },
      { pos: { row: 1, col: 2 }, positions: {farthest: {row: 2, col: 2}, next: {row: 3, col:2}} },
      { pos: { row: 0, col: 2 }, positions: {farthest: {row: 1, col: 2}, next: {row: 2, col:2}} },

      { pos: { row: 2, col: 3 }, positions: {farthest: {row: 3, col: 3}, next: {row: 4, col:3}} },
      { pos: { row: 1, col: 3 }, positions: {farthest: {row: 2, col: 3}, next: {row: 3, col:3}} },
      { pos: { row: 0, col: 3 }, positions: {farthest: {row: 1, col: 3}, next: {row: 2, col:3}} },
    ];

    expect(findFarthestPosition(grid, positions[0].pos, downVector)).toEqual(
      positions[0].positions
    );
    // expect(findFarthestPosition(grid, positions[1].pos, downVector)).toEqual(
    //   positions[1].positions
    // );

    // forEach(entry => {
    //   expect(findFarthestPosition(grid, entry.pos, downVector)).toEqual(entry.positions);
    // }, positions);
  });
});

function printGrid(grid) {
  console.table(grid.cells.map(row => row.map(c => (c === null ? 0 : c.value))));
}
