import { useEffect, useState } from "react"

import InitialBoard from "../../lib/src/Board"
import Pawn from "../../lib/src/Pawn"
import Queen from "../../lib/src/Queen"
import Game from "../../lib/src/Game"
import FigureClass from "../../lib/src/Figure"
import { Color } from "../../lib/src/Constants"

import Figure from "../figure/Figure"
import Turn from "../turn/Turn"
import Button from "../button/Button"
import History from "../history/History"
import Score from "../score/Score"

import { LETTERS } from "./Board.state"
import { Position } from "../figure/Figure.state"
import { HistoryItem } from "../history/History.state"
import {ScoreState} from "../score/Score.state"


const Board = () => {
  const [board, setBoard] = useState(new InitialBoard())
  const [clickedPosition, setClickedPosition] = useState<Position | null>(null)
  const [firstClickedPos, setFirstClickedPos] = useState<Position | null>(null)
  const [clickedElemStringFirst, setClickedElemStringFirst] = useState<string>("")
  const [clickedElemStringSecond, setClickedElemStringSecond] = useState<string>("")
  const [reachablePosition, setReachablePosition] = useState<Position[] | null>(null)
  const [game, setGame] = useState(new Game())
  const [score, setScore] = useState<ScoreState>({white: 0, black: 0})
  const [whosTurn, setWhosTurn] = useState<string>(board.getWhosTurn())
  const [matrix, setMatrix] = useState<(FigureClass | Color.EMPTY_PLACE)[][]>(game.getBoardMatrix())
  const [moveHistory, setMoveHistory] = useState<HistoryItem[]>([])
  
  useEffect(() => {
    if(clickedElemStringFirst){
      setFirstClickedPos(clickedPosition)
      let reachablePositionsArray: Position[] | null = game.pickAFigure(clickedElemStringFirst) 
      if(reachablePositionsArray !== null){
        setReachablePosition(reachablePositionsArray)
      }
    }

  }, [clickedElemStringFirst])

  useEffect(() => {
    if(clickedElemStringSecond && clickedElemStringFirst){
      let nextMove: boolean = game.makeTheNextMove(clickedElemStringSecond)
      if(nextMove){
        const lastMove = {
          step: `${clickedElemStringFirst} - ${clickedElemStringSecond}`,
          moveIndex: (moveHistory.length + 1).toString(),
          turn: whosTurn
        }

        setMoveHistory([...moveHistory, lastMove])
        setClickedElemStringFirst("")
        setClickedElemStringSecond("")
        setReachablePosition(null)
        setWhosTurn(game.board.getWhosTurn())
        updateScore()
      }
    }
  },[clickedElemStringFirst, clickedElemStringSecond, matrix])

  const handleFigureClicked = (arg: Position) => {
    let positionString = `${LETTERS[arg.column]}${matrix.length - arg.row}`

    //բացատների վրա քլիքի քեյս
    if(typeof matrix[arg.row][arg.column] !== "object" && clickedElemStringFirst === "" ){
      console.log("Invalid move")
    }else {
      const clickedFigure = matrix[arg.row][arg.column]
      if(clickedFigure instanceof FigureClass && clickedFigure.getColor() === game.board.getWhosTurn()){
        setClickedElemStringFirst(positionString)
        setFirstClickedPos(arg)
        setReachablePosition(game.pickAFigure(positionString))
      }else{      
        setClickedElemStringSecond(positionString)
        setFirstClickedPos(arg)
      }
    }

    setMatrix(game.getBoardMatrix())
    setClickedPosition(arg)
  }

  const updateScore = () => {
    let updatedScore = {
      white: 12 - game.board.getBlackCounter(),
      black: 12 - game.board.getWhiteCounter()
    }
    setScore(updatedScore)
  }

  const handleHistoryTrack = (arg: string) => {
    game.undoMove(arg)
    setMoveHistory(previous => previous.slice(0, +arg ))
    setMatrix(game.getBoardMatrix())

    // may be used
    // let currentBoard = game.getBoardHistory().getBoardHistory()
    // setMatrix(currentBoard[+arg]);
  }


  const handleReset = () => {
    const newGame = new Game()
    setGame(newGame)
    setBoard(new InitialBoard())
    setClickedPosition(null)
    setFirstClickedPos(null)
    setClickedElemStringFirst("")
    setClickedElemStringSecond("")
    setReachablePosition(null)
    setWhosTurn(newGame.board.getWhosTurn())
    setMatrix(newGame.getBoardMatrix())
    setMoveHistory([])
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 ml-7">
        <Button name = "Reset" clickFn = {handleReset} />
        <History moveHistory = {moveHistory} historyTrack = {handleHistoryTrack} />
        <Score score = {score}/>
        <Turn turn = {whosTurn}/>
      </div>
     <div className="flex flex-col ">
        <div className="flex flex-row">
            <div className="flex flex-col justify-end gap-12 mb-7 font-medium">
              {Array.from({ length: matrix.length }, (item, index) => (
                <div key={index} className="h-8 flex items-center justify-center">
                  {matrix.length - index}
                </div>
              ))}
            </div>
            <div className="border-emerald-700 border-4 rounded-xl ml-4">
              {matrix.map((row, indexRow) => {
                return (
                  <div key={indexRow} className="flex flex-row">
                    {row.map((column, indexColumn) => {
                      let figureType =
                        matrix[indexRow][indexColumn] instanceof Pawn
                          ? "pawn"
                          : matrix[indexRow][indexColumn] instanceof Queen
                          ? "queen"
                          : ""
                      return (
                        <Figure
                          color= {""}
                          position={{
                            row: indexRow,
                            column: indexColumn,
                          }}
                          firstClickedPosition = {firstClickedPos}
                          key={`${indexRow}-${indexColumn}`}
                          {...(typeof column === "object" ? column : {})}
                          figureType={figureType}
                          reachablePositions = {reachablePosition}
                          whosTurn = {whosTurn}
                          onFigureClickCb={handleFigureClicked}
                        />
                      )
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
  );
};

export default Board
