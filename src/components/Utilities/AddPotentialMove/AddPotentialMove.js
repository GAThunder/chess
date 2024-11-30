import { WouldCauseCheck } from "../WouldCauseCheck/WouldCauseCheck";
import { CopyBoard } from "../CopyBoard/CopyBoard";

//This generates a fake board, and on that board it makes each move to see if it would put the player in check, or if its valid to add as an option

/* AddPotentialMoves
squares - sends in a copy from the Moves feature, need to make another copy to see potentials
originalIndex - the piece we're moving
move to - where the piece is moving
potential moves - the array we're sending valid moves back to
original piece white - to see if the original piece was white
new Fen Array - to run each piece, I think this might be necessary for pawns and en passent */

function AddPotentialMove(squares, originalIndex, moveTo, potentialMoves, originalPieceWhite, newFenArray) {
    var tempSquares = CopyBoard(squares);

    tempSquares[moveTo].piece.pieceType = tempSquares[originalIndex].piece.pieceType;
    tempSquares[moveTo].piece.hasMoved = true;
    tempSquares[originalIndex].piece.pieceType = '';
    tempSquares[originalIndex].piece.hasMoved = true;

    if (WouldCauseCheck(tempSquares, newFenArray, originalPieceWhite) === false) {
        potentialMoves.push(moveTo);
    }
}

export { AddPotentialMove };