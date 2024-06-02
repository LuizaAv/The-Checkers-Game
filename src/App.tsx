import Board from "./components/board/Board";
import Popup from "./components/popup/Popup";
import { useState } from "react";

function App() {
  const [start, setStart] = useState<boolean>(false)
  
  const handlePopupButtonClick = () => {
    setStart(true)
  }

  return (
    <div className="flex justify-center align-middle pt-20">
      {start ? <Board /> : <Popup handlePopupButtonClick = {handlePopupButtonClick} message="Welcome to the game of Checkers!" buttonName="Start the Game"/>}
    </div>
  );
}

export default App;
