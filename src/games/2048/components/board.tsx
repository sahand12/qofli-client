import React from 'react';
import { BOARD_SIZE } from '../config';
import { TileManager } from './tile-manager';
import { TileType } from './types';

type Props = {
  tiles: TileType[];
};
function Board({ tiles }: Props) {
  const cells = new Array(BOARD_SIZE).fill(null).map(() => new Array(BOARD_SIZE).fill(null));

  return (
    <div className="tf-board">
      <div className="tf-grid">
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} className="tf-grid__row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="tf-grid__cell">
                {cell === null ? '' : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <TileManager tiles={tiles} />
    </div>
  );
}

export { Board };
