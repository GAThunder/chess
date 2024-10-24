import { PotentialMoves } from "../../board/piece/moves/Moves";
import { LocateKing } from "../LocateKing/LocateKing";

function OpponentPotentialMovesCheck(squares, index, newFenArray, turn) {
    let opponentPotentialMoves = [];
    if (turn === 'w') {
        let kingIndex = LocateKing(squares, true)
    }
    else {
        let kingIndex = LocateKing(squares, false)
    }

    squares.forEach((square, index) => {
        let pieceMoves = [];
        pieceMoves = PotentialMoves(squares, index, newFenArray)
        pieceMoves.forEach((index) => {
            if(!opponentPotentialMoves.includes(index)) {
                opponentPotentialMoves.push(index);
            }
        })
    });

    if(opponentPotentialMoves.includes(kingIndex)){
        return true;
    }
    else {
        return false;
    }
}

export { OpponentPotentialMovesCheck };