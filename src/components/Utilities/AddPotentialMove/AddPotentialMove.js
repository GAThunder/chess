import { OpponentPotentialMovesCheck } from "../OpponentPotentialMoves/OpponentPotentialMovesCheck";

//This is causing an infinite loop for some reason, need to figure out why. I don't want it to update the board, just simulate it on a copy

function AddPotentialMove(squares, index, moveTo, potentialMoves, whiteTurn, newFenArray) {
    let tempSquares = squares;
    tempSquares[moveTo].piece.pieceType = tempSquares[index].piece.pieceType;
    tempSquares[moveTo].piece.hasMoved = true;
    tempSquares[index].piece.pieceType = '';
    tempSquares[index].piece.hasMoved = true;
    console.log(newFenArray)

    if (!OpponentPotentialMovesCheck(tempSquares, newFenArray, whiteTurn)) {
        potentialMoves.push(moveTo);
        console.log(potentialMoves)
    }
}

export { AddPotentialMove };