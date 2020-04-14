import { buildTraversals } from './traversals';
import { range, reverse, map } from 'ramda';

describe('traversals', () => {
  test('buildTraversals', () => {
    // prettier-ignore
    const traversals = {
      0: [
        ...range(0, 4).map(row => ({col: 0, row})),
        ...range(0, 4).map(row => ({col: 1, row})),
        ...range(0, 4).map(row => ({col: 2, row})),
        ...range(0, 4).map(row => ({col: 3, row})),
      ], // up: first col, then rows
      1: [
        ...map(col => ({row: 0, col}), reverse(range(0, 4))),
        ...map(col => ({row: 1, col}), reverse(range(0, 4))),
        ...map(col => ({row: 2, col}), reverse(range(0, 4))),
        ...map(col => ({row: 3, col}), reverse(range(0, 4))),
      ], // right: first row, then cols reverse
      2:[
        ...range(0, 4).reverse().map(row => ({col: 0, row})),
        ...range(0, 4).reverse().map(row => ({col: 1, row})),
        ...range(0, 4).reverse().map(row => ({col: 2, row})),
        ...range(0, 4).reverse().map(row => ({col: 3, row})),
        ], // down: first col, then rows reverse
    3: [
      ...range(0, 4).map(col => ({col, row: 0})),
      ...range(0, 4).map(col => ({col, row: 1})),
      ...range(0, 4).map(col => ({col, row: 2})),
      ...range(0, 4).map(col => ({col, row: 3})),
    ] // left: first row, then cols
    };

    expect(buildTraversals(0, 4)).toEqual(traversals[0]);
    expect(buildTraversals(1, 4)).toEqual(traversals[1]);
    expect(buildTraversals(2, 4)).toEqual(traversals[2]);
    expect(buildTraversals(3, 4)).toEqual(traversals[3]);
  });
});
