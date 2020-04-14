import React, { useEffect, useState } from 'react';
import { TileType } from './types';
import cs from 'classnames';

const transitionSpeed = 100;

function Tile(props: TileType) {
  switch (props.kind) {
    case 'new':
    case 'still':
      return <NewOrStillOrMergedTile {...props} />;
    case 'dead':
      return <DeadTile {...props} />;
    case 'moved':
      return <MovedTile {...props} />;
    case 'merged':
      // @ts-ignore-start
      return (
        <>
          <NewOrStillOrMergedTile {...props} />
          {props.mergedFrom && <DeadTile {...props.mergedFrom[0]} />}
          {props.mergedFrom && <DeadTile {...props.mergedFrom[1]} />}
        </>
      );
    // @ts-ignore-end
    default:
      return null;
  }
}

function NewOrStillOrMergedTile(props: TileType) {
  let { row, col, kind, value } = props;
  const classes = cs([
    'tf-tile',
    `tf-tile--${value}`,
    `tf-tile--${kind}`,
    `tf-tile--position-${col}-${row}`
  ]);

  return (
    <div className={classes}>
      <div className="tf-tile__inner">{value}</div>
    </div>
  );
}

function MovedTile(props: TileType) {
  let { row, col, prev, value } = props;
  prev = prev || { row, col };
  const [position, setPosition] = useState(prev);
  const classes = cs([
    'tf-tile',
    'tf-tile--moved',
    `tf-tile--${value}`,
    `tf-tile--position-${position.col}-${position.row}`
  ]);

  useEffect(() => {
    const id = setTimeout(() => setPosition({ row, col }), 0);

    return () => clearTimeout(id);
  }, [row, col]);

  return (
    <div className={classes}>
      <div className="tf-tile__inner">{value}</div>
    </div>
  );
}

function DeadTile(props: TileType) {
  let { row, col, prev, value } = props;
  prev = prev || { row, col };
  const [position, setPosition] = useState(prev);
  const [dead, setDead] = useState(false);
  const classes = cs([
    'tf-tile',
    'tf-tile--moved',
    `tf-tile--${value}`,
    `tf-tile--position-${position.col}-${position.row}`,
    `${dead && 'tf-tile--dead'}`
  ]);

  useEffect(() => {
    const id1 = setTimeout(() => setPosition({ row, col }), 0);

    const id2 = setTimeout(() => {
      setDead(true);
    }, transitionSpeed);

    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
    };
  }, [row, col, dead]);

  return (
    <div className={classes}>
      <div className="tf-tile__inner">{value}</div>
    </div>
  );
}

export { Tile };
