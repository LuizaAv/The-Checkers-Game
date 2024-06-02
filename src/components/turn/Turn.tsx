import { TurnState } from "./Turn.state"


const Turn: React.FC<TurnState> = ({turn}) => {
    return(
        <div>
            <h1>Turn</h1>
            {`${turn === "w" ? "White" : "Black"} 's turn`}
        </div>
    )
}


export default  Turn