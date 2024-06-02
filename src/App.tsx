import Board from "./components/board/Board";
import Popup from "./components/popup/Popup";
import { useState } from "react";

function App() {
  const [start, setStart] = useState<boolean>(true)
  
  const handleStart = () => {
    setStart(true)
  }

  return (
    <div className="flex justify-center align-middle pt-20">
      {start ? <Board /> : <Popup handleStart = {handleStart} />}
    </div>
  );
}

export default App;
