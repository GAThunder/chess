import { LocateKing } from "../LocateKing/LocateKing";
import { IsWhite } from "../IsWhite/IsWhite";

/*This is supposed to get an array containing all the squares the other player is threatening, and see if after making a mock move, 
if that move is valid, or if it would put the king in check */

function OpponentPotentialMoves(squares, newFenArray, originalPieceWhite) {
    let opponentPotentialMoves = [];
    if (originalPieceWhite) {
        var kingIndex = LocateKing(squares, true)
    }
    else {
        var kingIndex = LocateKing(squares, false)
    }

    for(let i = 0; i < squares.length; i++){
        var pieceMoves = [];
        if(originalPieceWhite && !IsWhite(squares[i].piece.pieceType))
        {
            pieceMoves = squares[i].piece.pieceThreatens(squares, i, newFenArray)
                pieceMoves.forEach((index) => {
                    if (!opponentPotentialMoves.includes(index)) {
                        opponentPotentialMoves.push(index);
                    }
                })
        }
        else if (!originalPieceWhite && IsWhite(squares[i].piece.pieceType))
            {
                pieceMoves = squares[i].piece.pieceThreatens(squares, i, newFenArray)
                    pieceMoves.forEach((index) => {
                        if (!opponentPotentialMoves.includes(index)) {
                            opponentPotentialMoves.push(index);
                        }
                    })
            }
    }

    if (opponentPotentialMoves.includes(kingIndex)) {
        return true;
    }
    else {
        return false;
    }
}

export { OpponentPotentialMoves };