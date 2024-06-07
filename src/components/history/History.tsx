import { useState } from "react";
import { HistoryItem } from "./History.state";

type HistoryProps = {
  moveHistory: HistoryItem[];
  historyTrack: (arg: string, selectedElem: string) => void;
  whosTurn: string;
};

const History: React.FC<HistoryProps> = ({
  moveHistory,
  historyTrack,
  whosTurn,
}) => {
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

  return (
    <select
      className="flex justify-center items-center outline-none rounded-xl font-medium bg-fuchsia-50 border-amber-900 text-amber-900 border-4 h-18 w-60 text-center"
      onChange={(e) => handleSelectedChange(e)}
    >
      <option className="text-amber-950">Move to a step</option>
      {moveHistory.map((item, index) => {
        let countOfSteps = ++index;
        return (
          <option key={index} disabled={item.turn !== whosTurn} className="h-18 w-60 rounded-xl">
            {countOfSteps} . {item.turn === "w" ? "White" : "Black"}{" "}
            {`${item.step.slice(0, 3)} ${"->"} ${item.step.slice(item.step.length - 3)}`}
          </option>
        );
      })}
    </select>
  );
};

export default History;
