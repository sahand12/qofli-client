import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import shortid from 'shortid';

import { Board } from './board';
import { Heading } from './heading';
import { CellType, GridType, TileType } from './types';
import { useKeydown } from './effects';
import { processMove, startGame } from '../store/engine';

const initialState = startGame(4, 2);

function filterTiles(grid: GridType): TileType[] {
  const tiles: TileType[] = [];
  grid.cells.flat().forEach((cell: CellType) => {
    if (cell !== null) {
      tiles.push(cell);
    }
  });

  return tiles;
}

const tiles: TileType[] = filterTiles(initialState.grid);

function Page() {
  const [gameState, setGameState] = useState(initialState);
  useEffect(() => {
    const map = {
      37: 3,
      38: 0,
      39: 1,
      40: 2
    };
    function handleKeyDown(e: KeyboardEvent) {
      e.preventDefault();
      // @ts-ignore
      if (map[e.keyCode] !== undefined) {
        // @ts-ignore
        const { moved, grid, moveScore } = processMove(gameState.grid, map[e.keyCode]);
        setGameState({ ...gameState, grid, score: gameState.score + moveScore });
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });
  return (
    <div style={{ width: 500, margin: '0 auto' }}>
      <Heading score={340} best={65787} addition={0} />
      <Board tiles={filterTiles(gameState.grid)} />
    </div>
  );
}

export { Page };
