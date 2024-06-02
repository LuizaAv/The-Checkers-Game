import {useRef} from "react";
import { FigureProps} from "./Figure.state";



const Figure: React.FC<FigureProps> = ({ color, figureType, position, onFigureClickCb , whosTurn, reachablePositions, isClicked}) => {

  const ref = useRef<HTMLDivElement>(null);
  
  const handleFigureClicked = () => {
    onFigureClickCb(position)
  }

  const isReachable = reachablePositions?.some((pos ) => pos.row === position.row && pos.column === position.column);


  return (
        <div ref={ref}>
          {
            
            isReachable ? 
            <div className="flex bg-red-400 md:h-20 w-20 justify-center items-center text-4xl rounded-md"
              onClick={handleFigureClicked}
            ></div> : 
            (position.row + position.column) % 2 !== 0 ? (
              <div
                className={`flex md:h-20 w-20 ${isClicked && whosTurn !== "" && color ===  whosTurn ?  "bg-amber-400" : "bg-emerald-700"} justify-center items-center text-4xl rounded-md`}
                onClick={handleFigureClicked}
              >
                {
                  color === "w" && figureType === "pawn" ? <> ⚪ </> :
                  color === "w" && figureType === "queen" ? <> 🔳 </> :
                  color === "b" && figureType === "pawn" ? <> ⚫  </> :
                  color === "b" && figureType === "queen" ? <> 🔲 </> :
                  <></>
                }
              </div>
            ) :  <div className="flex bg-white md:h-20 w-20 justify-center items-center text-4xl rounded-md"
                    onClick={handleFigureClicked}
                  ></div>
          }
         </div>
      );
};

export default Figure;



