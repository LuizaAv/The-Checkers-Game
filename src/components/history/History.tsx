import { useState } from "react";
import {HistoryItem} from "./History.state"

type HistoryProps = {
    moveHistory: HistoryItem[]
    historyTrack: (arg: string) => void
}

const History: React.FC<HistoryProps> = ({moveHistory, historyTrack}) => {
    const [selectedValueIndex, setSelectedValue] = useState<string>("")

    const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let index = e.target.value !== "Move to a step" ? (+e.target.value[0] - 1) + "" : ""
        setSelectedValue(index)
        historyTrack(index)
    }
    // console.log(selectedValueIndex)

    return (
        <select
        className="flex justify-center items-center outline-none rounded-xl font-medium bg-fuchsia-50 border-emerald-700 text-emerald-700 border-4 h-18 w-60 text-center"
        onChange={(e) => handleSelectedChange(e)}
        >
            <option>Move to a step</option>
            {
                moveHistory.map((item, index) => {
                    let countOfSteps = ++index
                    return  <option key = {index}>
                                {countOfSteps} . {item.turn ===  "w" ? "White" : "Black"} - {item.step}
                            </option>
                })
            }
        </select>   
    );
};

export default History;
