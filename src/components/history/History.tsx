import useHistoryState from "./History.state";
import { HistoryProps } from "./History.state";

const History: React.FC<HistoryProps> = ({
  moveHistory,
  historyTrack,
  whosTurn,
}) => {
  const { handleSelectedChange } = useHistoryState({
    historyTrack,
  });

  return (
    <select
      className="flex justify-center items-center outline-none rounded-xl font-medium bg-fuchsia-50 border-amber-900 text-amber-900 border-4 h-18 w-60 text-center"
      onChange={(e) => handleSelectedChange(e)}
    >
      <option className="text-amber-950">Move to a step</option>
      {moveHistory.map((item, index) => {
        let countOfSteps = ++index;
        return (
          <option
            key={index}
            disabled={item.turn !== whosTurn}
            className="h-18 w-60 rounded-xl"
          >
            {countOfSteps} . {item.turn === "w" ? "White" : "Black"}{" "}
            {`${item.step.slice(0, 3)} ${"->"} ${item.step.slice(item.step.length - 3)}`}
          </option>
        );
      })}
    </select>
  );
};

export default History;
