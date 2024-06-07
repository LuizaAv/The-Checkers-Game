import useBoardState from "./Board.state";

import Figure from "../figure/Figure";
import Turn from "../turn/Turn";
import Button from "../button/Button";
import History from "../history/History";
import Score from "../score/Score";
import Popup from "../popup/Popup";

import { LETTERS } from "./Board.state";
import Pawn from "../../lib/src/Pawn";
import Queen from "../../lib/src/Queen";

const Board = () => {
  const {
    clickedPosition,
    reachablePosition,
    score,
    whosTurn,
    matrix,
    moveHistory,
    popupClick,
    popupMessage,
    winner,
    validMoves,
    handleFigureClicked,
    popUpClick,
    handleHistoryTrack,
    handleReset,
  } = useBoardState();

  return (
    <div className="flex flex-col gap-5">
      {winner && popupClick && (
        <Popup
          handlePopupButtonClick={popUpClick}
          message={`${winner === "w" ? "The Whites won the game" : "The Blacks won the game"}`}
          buttonName="Ok"
        />
      )}
      {popupMessage && popupClick && (
        <Popup
          handlePopupButtonClick={popUpClick}
          message={popupMessage}
          buttonName="Continue"
        />
      )}
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-5 ml-7">
          <Button name="Reset" clickFn={handleReset} />
          <History
            moveHistory={moveHistory}
            whosTurn={whosTurn}
            historyTrack={handleHistoryTrack}
          />
          <Score score={score} />
          <Turn turn={whosTurn} />
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-row">
            <div className="flex flex-col justify-end gap-12 mb-7 font-medium">
              {Array.from({ length: matrix.length }, (item, index) => (
                <div
                  key={index}
                  className="h-8 flex items-center justify-center"
                >
                  {matrix.length - index}
                </div>
              ))}
            </div>
            <div className="border-amber-900 border-4 rounded-xl ml-4">
              {matrix.map((row, indexRow) => {
                return (
                  <div key={indexRow} className="flex flex-row">
                    {row.map((column, indexColumn) => {
                      let figureType =
                        matrix[indexRow][indexColumn] instanceof Pawn
                          ? "pawn"
                          : matrix[indexRow][indexColumn] instanceof Queen
                            ? "queen"
                            : "";
                      return (
                        <Figure
                          color={""}
                          position={{
                            row: indexRow,
                            column: indexColumn,
                          }}
                          key={`${indexRow}-${indexColumn}`}
                          {...(typeof column === "object" ? column : {})}
                          figureType={figureType}
                          reachablePositions={reachablePosition}
                          whosTurn={whosTurn}
                          onFigureClickCb={handleFigureClicked}
                          isClicked={
                            clickedPosition?.row === indexRow &&
                            clickedPosition?.column === indexColumn
                          }
                          validMoves={validMoves}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row justify-center mt-2 gap-12">
            {LETTERS.map((letter, index) => (
              <div
                key={index}
                className="w-8 flex items-center justify-center font-medium"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
