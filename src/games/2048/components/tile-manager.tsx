import React from 'react';
import { Tile } from './tile';
import { TileType } from './types';

type Props = {
  tiles: TileType[];
};

const tiless = [
  { id: '1', col: 0, row: 0, value: 4, kind: 'merged', prev: null },
  { id: '2', col: 0, row: 0, value: 2, kind: 'dead', prev: { col: 3, row: 0 } },
  { id: '3', col: 0, row: 0, value: 2, kind: 'dead', prev: { col: 0, row: 0 } },
  { id: '4', col: 0, row: 2, value: 8, kind: 'moved', prev: { col: 3, row: 2 } },
  // {id: '1', col: 0, row: 0, kind: 'merged', prev: null},
  // {id: '1', col: 0, row: 0, kind: 'merged', prev: null},
  { id: '5', col: 2, row: 3, value: 4, kind: 'new', prev: null }
];

// @ts-ignore
function TileManager({ tiles }: Props) {
  return (
    <div className="tf-tiles">
      {tiles.map(tile => (
        // @ts-ignore
        <Tile key={tile.id} {...tile} />
      ))}
    </div>
  );
}

export { TileManager };
