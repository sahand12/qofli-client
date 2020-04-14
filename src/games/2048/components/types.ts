export type PositionType = { row: number; col: number };
export type VectorType = { dRow: number; dCol: number };

export type TileKindType = 'dead' | 'new' | 'moved' | 'merged' | 'still';
export type TileType = {
  id: string;
  row: number;
  col: number;
  value: number;
  kind: TileKindType;
  prev: PositionType | null;
  mergedFrom: [TileType, TileType] | null;
};

export type TileSerializedType = {
  position: PositionType;
  value: number;
  kind: TileKindType;
};
export type CellSerializedType = TileSerializedType | null;
export type CellType = TileType | null;
export type GridType = {
  size: number;
  cells: CellType[][];
};
export type GridSerializedType = {
  size: number;
  cells: CellSerializedType[][];
};
export type DirectionType = 'up' | 'right' | 'down' | 'left';

export interface ActionInterface {
  type: string;
  payload: any;
}

export type GameStateType = {
  // bestScore: number;
  score: number;
  startedAt: number;
  turn: number;
  over: boolean;
  grid: GridType;
};
export type GameStateSerializedType = {
  score: number;
  turn: number;
  over: boolean;
  lastDuration: number;
  grid: GridSerializedType;
};
