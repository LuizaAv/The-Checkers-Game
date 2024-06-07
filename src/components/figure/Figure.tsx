import { FigureProps } from "./Figure.state";
import useFigureState from "./Figure.state";

import white from "../../assets/white.svg";
import black from "../../assets/black.svg";

const Figure: React.FC<FigureProps> = ({
  color,
  figureType,
  position,
  onFigureClickCb,
  whosTurn,
  reachablePositions,
  isClicked,
  validMoves,
}) => {
  const { ref, handleFigureClicked, isReachable, isValidMove } = useFigureState(
    {
      color,
      figureType,
      position,
      onFigureClickCb,
      whosTurn,
      reachablePositions,
      isClicked,
      validMoves,
    }
  );

  return (
    <div ref={ref}>
      {isReachable ? (
        <div
          className="flex bg-lime-700 md:h-20 w-20 justify-center items-center text-4xl rounded-md"
          style={{ cursor: "pointer" }}
          onClick={handleFigureClicked}
        ></div>
      ) : (position.row + position.column) % 2 !== 0 ? (
        <div
          className={`flex md:h-20 w-20 ${
            isValidMove && !isClicked
              ? "bg-red-400"
              : isClicked && whosTurn !== "" && color === whosTurn
                ? "bg-amber-400"
                : "bg-amber-900"
          } justify-center items-center text-4xl rounded-md`}
          onClick={handleFigureClicked}
          style={{ transition: "0.5s ease-out", cursor: "pointer" }}
        >
          {color === "w" && figureType === "pawn" ? (
            <div> ⚪ </div>
          ) : color === "w" && figureType === "queen" ? (
            <div className="h-10 w-10">
              {" "}
              <img
                src={white}
                alt="whiteQueen"
                className="h-full w-full object-contain"
              />{" "}
            </div>
          ) : color === "b" && figureType === "pawn" ? (
            <div> ⚫ </div>
          ) : color === "b" && figureType === "queen" ? (
            <div className="h-10 w-10">
              {" "}
              <img
                src={black}
                alt="blackQueen"
                className="h-full w-full object-contain"
              />{" "}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div
          className="flex bg-white md:h-20 w-20 justify-center items-center text-4xl rounded-md"
          onClick={handleFigureClicked}
        ></div>
      )}
    </div>
  );
};

export default Figure;
