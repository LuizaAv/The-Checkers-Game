import {ScoreState} from "./Score.state"

interface ScoreProps {
    score: ScoreState
}

const Score: React.FC <ScoreProps> = ({score}) => {
    return(
        <div className="flex font-medium text-amber-950 gap-3">
            <div>
                <h2>White</h2>
                <span>{score?.white}</span>
            </div>
            <div>
                <h2>Black</h2>
                <span>{score?.black}</span>
            </div>
        </div>
    )
}

export default Score