import { IsWhite } from "../IsWhite/IsWhite";

function OpponentThreatens(squares, newFenArray, originalPieceWhite, movesArray) {
    for(let i = 0; i < squares.length; i++){
        var pieceMoves = [];
        if(originalPieceWhite && !IsWhite(squares[i].piece.pieceType))
        {
            pieceMoves = squares[i].piece.pieceThreatens(squares, i, newFenArray)
                pieceMoves.forEach((index) => {
                    if (!movesArray.includes(index)) {
                        movesArray.push(index);
                    }
                })
        }
        else if (!originalPieceWhite && IsWhite(squares[i].piece.pieceType))
            {
                pieceMoves = squares[i].piece.pieceThreatens(squares, i, newFenArray)
                    pieceMoves.forEach((index) => {
                        if (!movesArray.includes(index)) {
                            movesArray.push(index);
                        }
                    })
            }
    }
}

export {OpponentThreatens}