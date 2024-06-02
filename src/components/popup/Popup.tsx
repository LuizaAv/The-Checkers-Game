import React from "react";
import Button from "../button/Button";

interface PopupProps {
  handleStart: (arg: Boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ handleStart }) => {
  const handleStartClick = () => {
    handleStart(true);
  };

  return (
    <div className="flex flex-col text-center bg-slate-100 border-2 border-emerald-700 max-w-lg sm:p-8 md:p-10 lg:p-12 rounded-lg">
      <h1 className="text-xl md:text-xl lg:text-2xl font-bold mb-4 text-emerald-700 text-center">
        Welcome to the game of Checkers!
      </h1>
      <div className="flex m-auto mt-10">
        <Button name="Start the Game" clickFn={handleStartClick} />
      </div>
    </div>
  );
};

export default Popup;
