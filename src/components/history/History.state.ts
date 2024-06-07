import { useState } from "react";

export type HistoryItem = {
  step: string;
  moveIndex: string;
  turn: string;
};

export type HistoryProps = {
  moveHistory: HistoryItem[];
  historyTrack: (arg: string, selectedElem: string) => void;
  whosTurn: string;
};

export type HistoryState = HistoryItem[];

const useHistoryState = ({ historyTrack }) => {
  const [, setSelectedValue] = useState<string>("");

  const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let index =
      e.target.value !== "Move to a step"
        ? (typeof +e.target.value[1] === "number"
            ? +e.target.value.slice(0, 2) - 1
            : +e.target.value[0] - 1) + ""
        : "";
    setSelectedValue(index);
    historyTrack(index, e.target.value);
  };

  return {
    handleSelectedChange,
  };
};

export default useHistoryState;
