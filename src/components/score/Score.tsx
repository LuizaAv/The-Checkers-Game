import {ScoreState} from "./Score.state"

interface ScoreProps {
    score: ScoreState
}

const Score: React.FC<ScoreProps> = ({score}) => {
    return(
        <div className="flex gap-3 text-emerald-700 font-medium">
            <div>
                <h2>Whites</h2>
                <span>{score?.white}</span>
            </div>
            <div>
                <h2>Blacks</h2>
                <span>{score?.black}</span>
            </div>
        </div>
    )
}

export default Score