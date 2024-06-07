import { useRef } from "react";

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
  isClicked: boolean;
  validMoves: Position[] | null;
};

const useFigureState = ({
  color,
  figureType,
  position,
  onFigureClickCb,
  whosTurn,
  reachablePositions,
  isClicked,
  validMoves,
}: FigureProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleFigureClicked = () => {
    onFigureClickCb(position);
  };

  const isReachable = reachablePositions?.some(
    (pos) => pos.row === position.row && pos.column === position.column
  );

  const isValidMove = validMoves?.some(
    (move) => move.row === position.row && move.column === position.column
  );

  return {
    ref,
    handleFigureClicked,
    isReachable,
    isValidMove,
    color,
    figureType,
    position,
    onFigureClickCb,
    whosTurn,
    reachablePositions,
    isClicked,
    validMoves,
  };
};

export default useFigureState;
