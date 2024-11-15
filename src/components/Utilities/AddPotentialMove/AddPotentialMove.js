import { OpponentPotentialMoves } from "../OpponentPotentialMoves/OpponentPotentialMoves";
import { CopyBoard } from "../CopyBoard/CopyBoard";

//This generates a fake board, and on that board it makes each move to see if it would put the player in check, or if its valid to add as an option

function AddPotentialMove(squares, index, moveTo, potentialMoves, originalPieceWhite, newFenArray) {
    const tempSquares = CopyBoard(squares);

    tempSquares[moveTo].piece.pieceType = tempSquares[index].piece.pieceType;
    tempSquares[moveTo].piece.hasMoved = true;
    tempSquares[index].piece.pieceType = '';
    tempSquares[index].piece.hasMoved = true;

    if (!OpponentPotentialMoves(tempSquares, newFenArray, originalPieceWhite)) {
        potentialMoves.push(moveTo);
    }
}

export { AddPotentialMove };