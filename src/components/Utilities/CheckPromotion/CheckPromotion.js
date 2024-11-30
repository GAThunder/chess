import { IsOnTopEdge } from "../IsOnEdge/IsOnTopEdge";
import { IsOnBottomEdge } from "../IsOnEdge/IsOnBottomEdge";

function CheckPromotion(squares, turn) {
    if(turn === 'w') {
        for(let i = 0; i < squares.length; i++) {
            if(IsOnTopEdge(squares, i) && squares[i].piece.pieceType === 'P') {
                return i;
            }
        }
    }
    else {
        for(let i = 0; i < squares.length; i++) {
            if(IsOnBottomEdge(squares, i) && squares[i].piece.pieceType === 'p') {
                return i;
            }
        }
    }
    return -1;
}

export { CheckPromotion };