export type Position = {
  row: number;
  column: number;
};

export type FigureProps = {
  color: string;
  figureType: string;
  position: Position;
  firstClickedPosition: Position | null;
  reachablePositions: Position[] | null;
  whosTurn: string;
  onFigureClickCb: (position: Position) => void;
};

