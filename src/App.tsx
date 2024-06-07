import Board from "./components/board/Board"
import Popup from "./components/popup/Popup";
import { useState } from "react";


function App() {
  const [start, setStart] = useState<boolean>(true)
  
  const handlePopupButtonClick = () => {
    setStart(true)
  }

  return (
    <div className="flex justify-center align-middle pt-20">
      {start ? <div className="flex gap-20 text-amber-950">
                <Board /> 
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-red-400"></div>
                    <div>The possible steps player can do</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-lime-700"></div>
                    <div>The reachable positions clicked position can achieve</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-amber-400"></div>
                    <div>The clicked position</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-amber-900"></div>
                    <div>Figure' positions</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Others  -  unreachable</div>
                  </div>
                </div>
              </div>
            :
              <Popup handlePopupButtonClick = {handlePopupButtonClick} message="Welcome to the game of Checkers!" buttonName="Start the Game"/>}
    </div>
  );
}

export default App;
