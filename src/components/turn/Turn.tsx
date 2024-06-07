import { TurnState } from "./Turn.state"


const Turn: React.FC<TurnState> = ({turn}) => {
    return(
        <div className="text-amber-950 font-small">
            <h1 className="font-medium">Turn</h1>
            {`${turn === "w" ? "White" : "Black"} 's turn`}
        </div>
    )
}


export default  Turn