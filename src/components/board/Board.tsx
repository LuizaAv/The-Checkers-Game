import { useEffect, useState } from "react"
import InitialBoard from "../../lib/src/Board"
import Pawn from "../../lib/src/Pawn"
import Queen from "../../lib/src/Queen"
import Figure from "../figure/Figure"
import { LETTERS } from "./Board.state"
import { Position } from "../figure/Figure.state"
import Game from "../../lib/src/Game"
import Turn from "../turn/Turn"
import FigureClass from "../../lib/src/Figure"
import { Color } from "../../lib/src/Constants"
import Button from "../button/Button"
import History from "../history/History"



const Board = () => {
  const [board, setBoard] = useState(new InitialBoard())
  const [clickedPosition, setClickedPosition] = useState<Position | null>(null)
  const [firstClickedPos, setFirstClickedPos] = useState<Position | null>(null)
  const [clickedElemStringFirst, setClickedElemStringFirst] = useState<string>("")
  const [clickedElemStringSecond, setClickedElemStringSecond] = useState<string>("")
  const [reachablePosition, setReachablePosition] = useState<Position[] | null>(null)
  const [game, setGame] = useState(new Game())
  const [whosTurn, setWhosTurn] = useState<string>(board.getWhosTurn())
  const [matrix, setMatrix] = useState<(FigureClass | Color.EMPTY_PLACE)[][]>(game.getBoardMatrix())
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  

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
    if(clickedElemStringSecond){
      let nextMove: boolean = game.makeTheNextMove(clickedElemStringSecond)
      if(nextMove){
        setClickedElemStringFirst("")
        setClickedElemStringSecond("")
        setReachablePosition(null)
        setWhosTurn(game.board.getWhosTurn())
      }
    }
  },[clickedElemStringSecond, matrix])


  const handleFigureClicked = (arg: Position) => {
    let positionString = `${LETTERS[arg.column]}${matrix.length - arg.row}`
    console.log(Figure instanceof Queen)

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
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <Button name = "Reset" clickFn = {handleReset} />
        <History />
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