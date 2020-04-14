import { range, flatten, memoizeWith } from 'ramda';
import { PositionType } from '../components/types';

function traversals(dir: number, gridSize: number): PositionType[] {
  const map: { [key: number]: PositionType[] } = {
    //up
    0: flatten(range(0, gridSize).map(col => range(0, gridSize).map(row => ({ row, col })))),

    // right
    1: flatten(
      range(0, gridSize).map(row =>
        range(0, gridSize)
          .reverse()
          .map(col => ({ row, col }))
      )
    ),

    // down
    2: flatten(
      range(0, gridSize).map(col =>
        range(0, gridSize)
          .reverse()
          .map(row => ({ row, col }))
      )
    ),

    // left
    3: flatten(range(0, gridSize).map(row => range(0, gridSize).map(col => ({ row, col }))))
  };

  return map[dir];
}

const buildTraversals = memoizeWith((a, b) => a + ' ' + b, traversals);

export { buildTraversals };
