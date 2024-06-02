export type Position = {
  row: number;
  column: number;
};

export type FigureProps = {
  color: string;
  figureType: string;
  position: Position;
  reachablePositions: Position[] | null;
  whosTurn: string;
  onFigureClickCb: (position: Position) => void;
  isClicked: boolean
};

