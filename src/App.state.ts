import { useState } from "react";

export type StepsDone = {
  color: string;
  value: string;
};

export type Score = {
  Player1: number;
  Player2: number;
};

export type StepsDoneArray = StepsDone[];

const useAppState = () => {
  const [start, setStart] = useState<boolean>(true);

  const handlePopupButtonClick = () => {
    setStart(true);
  };

  return {
    start,
    handlePopupButtonClick,
  };
};

export default useAppState;
