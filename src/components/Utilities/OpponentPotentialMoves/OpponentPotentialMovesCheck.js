import { PotentialMoves } from "../../board/piece/moves/Moves";
import { LocateKing } from "../LocateKing/LocateKing";

function OpponentPotentialMovesCheck(squares, newFenArray, whiteTurn) {
    var opponentPotentialMoves = [];
    if (whiteTurn === true) {
        var kingIndex = LocateKing(squares, true)
    }
    else {
        var kingIndex = LocateKing(squares, false)
    }

    for(let i = 0; i < 64; i++) {
        let pieceMoves = [];
        pieceMoves = PotentialMoves(squares, i, newFenArray)
        
        for(let j = 0; j < pieceMoves.length; j++)
        {
            if(!opponentPotentialMoves.includes(pieceMoves[j])) {
                opponentPotentialMoves.push(pieceMoves[j]);
                console.log(opponentPotentialMoves)
            }
        }

    }

   /* tempSquares.forEach((square, index) => {
        let pieceMoves = [];
        pieceMoves = PotentialMoves(squares, index, newFenArray)
        pieceMoves.forEach((index) => {
            if(!opponentPotentialMoves.includes(index)) {
                opponentPotentialMoves.push(index);
            }
        })
    }); */

    if(opponentPotentialMoves.includes(kingIndex)){
        return true;
    }
    else {
        return false;
    }
}

export { OpponentPotentialMovesCheck };