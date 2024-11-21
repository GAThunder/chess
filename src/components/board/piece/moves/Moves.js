import { ResetPassant } from "../../../Utilities/ResetPassant/ResetPassant";
import { IsOnEdge } from "../../../Utilities/IsOnEdge/IsOnEdge";
import { IsWhite } from "../../../Utilities/IsWhite/IsWhite";
import { AddPotentialMove } from "../../../Utilities/AddPotentialMove/AddPotentialMove";

/* Moves functions. Pawns, Knights, and Castling needs unique functions due to their special properties. */

const up = -8;
const down = 8;
const left = -1;
const right = 1;
const upLeft = -9;
const upRight = -7;
const downLeft = 7;
const downRight = 9;

function PotentialMoves(squares, index, newFenArray, isJustThreaten) {
    let potentialMoves = [];
    switch (squares[index].piece.pieceType) {
        case 'P':
            if (!isJustThreaten) {
                if (!squares[index].piece.hasMoved) {
                    PawnMoveUp(squares, index, 0, 2, potentialMoves, true, isJustThreaten, newFenArray)
                }
                else {
                    PawnMoveUp(squares, index, 0, 1, potentialMoves, true, isJustThreaten, newFenArray)
                }
            }
            PawnTake(squares, index, potentialMoves, true, isJustThreaten, newFenArray)
            break;

        case 'R':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, true, index, isJustThreaten, newFenArray)
            break;

        case 'N':
            KnightMove(squares, index, potentialMoves, isJustThreaten, true, newFenArray)
            break;

        case 'B':
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, true, index, isJustThreaten, newFenArray)
            break;

        case 'Q':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, true, index, isJustThreaten, newFenArray)
            break;

        case 'K':
            MoveDirectional(squares, index, 0, 1, up, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, down, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, left, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, right, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, upLeft, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, upRight, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, downLeft, potentialMoves, true, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, downRight, potentialMoves, true, index, isJustThreaten, newFenArray)
            if (!isJustThreaten) {
                Castle(squares, newFenArray, potentialMoves, true)
            }
            break;

        case 'p':
            if (!isJustThreaten) {
                if (!squares[index].piece.hasMoved) {
                    PawnMoveDown(squares, index, 0, 2, potentialMoves, true)
                }
                else {
                    PawnMoveDown(squares, index, 0, 1, potentialMoves, true)
                }
            }
            PawnTake(squares, index, potentialMoves, false, isJustThreaten, newFenArray)
            break;

        case 'r':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, false, index, isJustThreaten, newFenArray)
            break;

        case 'n':
            KnightMove(squares, index, potentialMoves, isJustThreaten, false, newFenArray)
            break;

        case 'b':
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, false, index, isJustThreaten, newFenArray)
            break;

        case 'q':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, false, index, isJustThreaten, newFenArray)
            break;

        case 'k':
            MoveDirectional(squares, index, 0, 1, up, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, down, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, left, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, right, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, upLeft, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, upRight, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, downLeft, potentialMoves, false, index, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, downRight, potentialMoves, false, index, isJustThreaten, newFenArray)
            if (!isJustThreaten) {
                Castle(squares, newFenArray, potentialMoves, false)
            }
            break;
    }

    return potentialMoves;
}

function MovePiece(newSquares, index, selectedPiece, newFenArray) {
    let FenPassant = newFenArray[4];
    if (FenPassant !== '-') {
        if (newSquares[selectedPiece].piece.pieceType === 'p') {
            if (newSquares[index].position === FenPassant) {
                newSquares[index - 8].piece.pieceType = '';
            }
        }
        if (newSquares[selectedPiece].piece.pieceType === 'P') {
            if (newSquares[index].position === FenPassant) {
                newSquares[index + 8].piece.pieceType = '';
            }
        }
    }
    ResetPassant(newSquares, newFenArray);
    PotentialEnPassant(newSquares, index, selectedPiece, newFenArray);
    rookCastle(newSquares, selectedPiece, index);

    newSquares[index].piece.pieceType = newSquares[selectedPiece].piece.pieceType;
    newSquares[index].piece.hasMoved = true;
    newSquares[selectedPiece].piece.pieceType = '';
    newSquares[selectedPiece].piece.hasMoved = true;

    if (newFenArray[2] !== '-' && newFenArray[3] !== '-') {
        updateCastle(newSquares, newFenArray);
    }

}

/* When it updates it checks like the piece is already on the adjacent square, need to update it so that the initial index stays the same
If not when it passes, it tries to move the new index with the next viable spot, but that's just a blank space. */


/* MoveDirectional, 
Squares - passed in as a copy of the board from the Chess function
index - the piece we're moving
maxDepth - the board is only 8 by 8, can never go further, can restrict it down to 1 for king
direction - where is the piece moving to
potential moves - the array we're adding the potential moves to if they're valid
original piece white - need to keep track of original color for recursion
original index - makes sure the piece is being moved when we see if its checked, not an empty space
isJustThreaten - if true, we don't need to see if it can be moved without causing check, just if the piece is threatening a space
newFen Array - might need for checking other moves in recurrsion, not 100% sure why I added this in, I think maybe to check pawn moves */

function MoveDirectional(
    squares,
    index,
    count,
    maxDepth,
    direction,
    potentialMoves,
    originalPieceWhite,
    originalIndex,
    isJustThreaten,
    newFenArray) {

    let moveTo = index + direction;

    let moveRight = false;
    let moveLeft = false;
    let moveUp = false;
    let moveDown = false;

    if (count < maxDepth) {
        if (IsOnEdge(squares, index, direction, moveDown, moveLeft, moveRight, moveUp)) {
            if (originalPieceWhite) {
                if (isJustThreaten) {
                    if (squares[moveTo].piece.pieceType === '') {
                        potentialMoves.push(moveTo);
                        MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite, originalIndex, isJustThreaten, newFenArray);
                    }
                    else if (!IsWhite(squares[moveTo].piece.pieceType)) {
                        potentialMoves.push(moveTo);
                    }
                }
                else {
                    if (squares[moveTo].piece.pieceType === '') {
                        AddPotentialMove(squares, originalIndex, moveTo, potentialMoves, originalPieceWhite, newFenArray);
                        MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite, originalIndex, isJustThreaten, newFenArray);
                    }
                    else if (!IsWhite(squares[moveTo].piece.pieceType)) {
                        AddPotentialMove(squares, originalIndex, moveTo, potentialMoves, originalPieceWhite, newFenArray);
                    }
                }
            }
            else {
                if (isJustThreaten) {
                    if (squares[moveTo].piece.pieceType === '') {
                        potentialMoves.push(moveTo);
                        MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite, originalIndex, isJustThreaten, newFenArray);
                    }
                    else if (IsWhite(squares[moveTo].piece.pieceType)) {
                        potentialMoves.push(moveTo);
                    }
                }
                else {
                    if (squares[moveTo].piece.pieceType === '') {
                        AddPotentialMove(squares, originalIndex, moveTo, potentialMoves, originalPieceWhite, newFenArray);
                        MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite, originalIndex, isJustThreaten, newFenArray);
                    }
                    else if (IsWhite(squares[moveTo].piece.pieceType)) {
                        AddPotentialMove(squares, originalIndex, moveTo, potentialMoves, originalPieceWhite, newFenArray);
                    }
                }
            }
        }

    }
    return -1;
}

function KnightMove(squares, index, potentialMoves, isJustThreaten, originalPieceWhite, newFenArray) {
    if (index - 16 >= 0) {
        if (squares[index - 16].position[0] !== 'H') {
            if (squares[index - 15].piece.pieceType === '') {
                if (isJustThreaten) {
                    potentialMoves.push(index - 15);
                }
                else {
                    AddPotentialMove(squares, index, index - 15, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
            if (IsWhite(squares[index].piece.pieceType)) {
                if (!IsWhite(squares[index - 15].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 15);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 15, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            else {
                if (IsWhite(squares[index - 15].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 15);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 15, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }
        if (squares[index - 16].position[0] !== 'A') {
            if (squares[index - 17].piece.pieceType === '') {
                if (isJustThreaten) {
                    potentialMoves.push(index - 17);
                }
                else {
                    AddPotentialMove(squares, index, index - 17, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
            if (IsWhite(squares[index].piece.pieceType)) {
                if (!IsWhite(squares[index - 17].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 17);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 17, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            else {
                if (IsWhite(squares[index - 17].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 17);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 17, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }
    }

    if (index + 16 <= 63) {
        if (squares[index + 16].position[0] !== 'H') {
            if (squares[index + 17].piece.pieceType === '') {
                if (isJustThreaten) {
                    potentialMoves.push(index + 17);
                }
                else {
                    AddPotentialMove(squares, index, index + 17, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
            if (IsWhite(squares[index].piece.pieceType)) {
                if (!IsWhite(squares[index + 17].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 17);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 17, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            else {
                if (IsWhite(squares[index + 17].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 17);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 17, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }
        if (squares[index + 16].position[0] !== 'A') {
            if (squares[index + 15].piece.pieceType === '') {
                if (isJustThreaten) {
                    potentialMoves.push(index + 15);
                }
                else {
                    AddPotentialMove(squares, index, index + 15, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
            if (IsWhite(squares[index].piece.pieceType)) {
                if (!IsWhite(squares[index + 15].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 15);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 15, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            else {
                if (IsWhite(squares[index + 15].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 15);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 15, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }
    }

    if (index - 8 >= 0) {
        if ((squares[index - 8].position[0] !== 'H') && (squares[index - 7].position[0] !== 'H')) {
            if (squares[index - 6].piece.pieceType === '') {
                if (isJustThreaten) {
                    potentialMoves.push(index - 6);
                }
                else {
                    AddPotentialMove(squares, index, index - 6, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
            if (IsWhite(squares[index].piece.pieceType)) {
                if (!IsWhite(squares[index - 6].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 6);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 6, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            else {
                if (IsWhite(squares[index - 6].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 6);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 6, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }

        if ((squares[index - 8].position[0] !== 'A') && (squares[index - 9].position[0] !== 'A')) {
            if (squares[index - 10].piece.pieceType === '') {
                if (isJustThreaten) {
                    potentialMoves.push(index - 10);
                }
                else {
                    AddPotentialMove(squares, index, index - 10, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
            if (IsWhite(squares[index].piece.pieceType)) {
                if (!IsWhite(squares[index - 10].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 10);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 10, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            else {
                if (IsWhite(squares[index - 10].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 10);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 10, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }
    }

    if (index + 8 <= 63) {
        if ((squares[index + 8].position[0] !== 'A') && (squares[index + 7].position[0] !== 'A')) {
            if (squares[index + 6].piece.pieceType === '') {
                if (isJustThreaten) {
                    potentialMoves.push(index + 6);
                }
                else {
                    AddPotentialMove(squares, index, index + 6, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
            if (IsWhite(squares[index].piece.pieceType)) {
                if (!IsWhite(squares[index + 6].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 6);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 6, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            else {
                if (IsWhite(squares[index + 6].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 6);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 6, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }

        if ((squares[index + 8].position[0] !== 'H') && (squares[index + 9].position[0] !== 'H')) {
            if (squares[index + 10].piece.pieceType === '') {
                if (isJustThreaten) {
                    potentialMoves.push(index + 10);
                }
                else {
                    AddPotentialMove(squares, index, index + 10, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
            if (IsWhite(squares[index].piece.pieceType)) {
                if (!IsWhite(squares[index + 10].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 10);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 10, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            else {
                if (IsWhite(squares[index + 10].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 10);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 10, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }
    }
    return -1;
}

function PawnTake(squares, index, potentialMoves, originalPieceWhite, isJustThreaten, newFenArray) {
    if (IsWhite(squares[index].piece.pieceType)) {
        if (squares[index].position[0] !== 'A') {
            if (index - 9 >= 0) {
                if (!IsWhite(squares[index - 9].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 9);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 9, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
            if (squares[index - 1].piece.potentialPassant) {
                if (isJustThreaten) {
                    potentialMoves.push(index - 9);
                }
                else {
                    AddPotentialMove(squares, index, index - 9, potentialMoves, originalPieceWhite, newFenArray)
                }
            }
        }
        if (squares[index].position[0] !== 'H') {
            if (index - 7 >= 0) {
                if (!IsWhite(squares[index - 7].piece.pieceType)) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 7);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 7, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
                if (squares[index + 1].piece.potentialPassant) {
                    if (isJustThreaten) {
                        potentialMoves.push(index - 7);
                    }
                    else {
                        AddPotentialMove(squares, index, index - 7, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }

    }
    else {
        if (squares[index].position[0] !== 'A') {
            if (index + 7 <= 63) {
                if (IsWhite(squares[index + 7].piece.pieceType) && squares[index + 7].piece.pieceType !== '') {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 7);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 7, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
                if (squares[index - 1].piece.potentialPassant) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 7);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 7, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }
        if (squares[index].position[0] !== 'H') {
            if (index + 9 <= 63) {
                if (IsWhite(squares[index + 9].piece.pieceType) && squares[index + 9].piece.pieceType !== '') {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 9);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 9, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
                if (squares[index + 1].piece.potentialPassant) {
                    if (isJustThreaten) {
                        potentialMoves.push(index + 9);
                    }
                    else {
                        AddPotentialMove(squares, index, index + 9, potentialMoves, originalPieceWhite, newFenArray)
                    }
                }
            }
        }
    }
    return -1;
}

function PawnMoveUp(squares, index, count, maxDepth, potentialMoves, originalPieceWhite, isJustThreaten, newFenArray) {
    let moveTo = index + up;
    if (count < maxDepth) {
        if (moveTo >= 0) {
            if (originalPieceWhite) {
                if (squares[moveTo].piece.pieceType === '') {
                    if (isJustThreaten) {
                        potentialMoves.push(moveTo);
                        PawnMoveUp(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite, isJustThreaten, newFenArray);
                    }
                    else {
                        AddPotentialMove(squares, index, moveTo, potentialMoves, originalPieceWhite, newFenArray)
                        PawnMoveUp(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite, isJustThreaten, newFenArray);
                    }
                    
                }
            }
        }
    }
    return -1;
}

function PawnMoveDown(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    let moveTo = index + down;
    if (count < maxDepth) {
        if (moveTo <= 63) {
            if (originalPieceWhite) {
                if (squares[moveTo].piece.pieceType === '') {
                    potentialMoves.push(moveTo);
                    PawnMoveDown(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }

            }
            else {
                if (squares[moveTo].piece.pieceType === '') {
                    potentialMoves.push(moveTo);
                    PawnMoveDown(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }

            }
        }
    }

    return -1;
}

function PotentialEnPassant(squares, index, selectedPiece, newFenArray) {
    if (squares[selectedPiece].piece.pieceType === 'P') {
        if (selectedPiece - index === 16) {
            if (squares[index].position[0] !== 'H') {
                if (squares[index + 1].piece.pieceType === 'p') {
                    newFenArray[4] = squares[index + 8].position;
                    squares[index].piece.potentialPassant = true;
                }
            }
            if (squares[index].position[0] !== 'A') {
                if (squares[index - 1].piece.pieceType === 'p') {
                    newFenArray[4] = squares[index + 8].position;
                    squares[index].piece.potentialPassant = true;
                }
            }

        }
    }

    if (squares[selectedPiece].piece.pieceType === 'p') {
        if (selectedPiece - index === -16) {
            if (squares[index].position[0] !== 'H') {
                if (squares[index + 1].piece.pieceType === 'P') {
                    newFenArray[4] = squares[index - 8].position;
                    squares[index].piece.potentialPassant = true;
                }
            }
            if (squares[index].position[0] !== 'A') {
                if (squares[index - 1].piece.pieceType === 'P') {
                    newFenArray[4] = squares[index - 8].position;
                    squares[index].piece.potentialPassant = true;
                }
            }

        }
    }

}

function Castle(squares, newFenArray, potentialMoves, originalPieceWhite) {
    if (originalPieceWhite) {
        if (newFenArray[2].includes('K')) {
            if (!squares[60].piece.isCheck) {
                if (squares[61].piece.pieceType === '' && !squares[61].piece.isCheck &&
                    squares[62].piece.pieceType === '' && !squares[62].piece.isCheck) {
                    potentialMoves.push(62);
                }
            }
        }

        if (newFenArray[2].includes('Q')) {
            if (!squares[60].piece.isCheck) {
                if (squares[59].piece.pieceType === '' && !squares[59].piece.isCheck &&
                    squares[58].piece.pieceType === '' && !squares[58].piece.isCheck &&
                    squares[57].piece.pieceType === '' && !squares[57].piece.isCheck) {
                    potentialMoves.push(58);
                }
            }
        }
    }

    if (!originalPieceWhite) {
        if (newFenArray[3].includes('k')) {
            if (!squares[4].piece.isCheck) {
                if (squares[5].piece.pieceType === '' && !squares[5].piece.isCheck &&
                    squares[6].piece.pieceType === '' && !squares[6].piece.isCheck) {
                    potentialMoves.push(6);
                }
            }
        }

        if (newFenArray[3].includes('q')) {
            if (!squares[4].piece.isCheck) {
                if (squares[3].piece.pieceType === '' && !squares[3].piece.isCheck &&
                    squares[2].piece.pieceType === '' && !squares[2].piece.isCheck &&
                    squares[1].piece.pieceType === '' && !squares[1].piece.isCheck) {
                    potentialMoves.push(2);
                }
            }
        }
    }

    return -1;
}

function updateCastle(squares, newFenArray) {
    if (squares[56].piece.hasMoved) {
        if (newFenArray[2].includes('KQ')) {
            newFenArray[2] = 'K';
        }
        else if (newFenArray[2].includes('Q')) {
            newFenArray[2] = '-';
        }
    }
    if (squares[63].piece.hasMoved) {
        if (newFenArray[2].includes('KQ')) {
            newFenArray[2] = 'Q';
        }
        else if (newFenArray[2].includes('K')) {
            newFenArray[2] = '-';
        }
    }
    if (squares[60].piece.hasMoved) {
        newFenArray[2] = '-';
    }
    if (squares[0].piece.hasMoved) {
        if (newFenArray[3].includes('kq')) {
            newFenArray[3] = 'k';
        }
        else if (newFenArray[3].includes('q')) {
            newFenArray[3] = '-';
        }
    }
    if (squares[7].piece.hasMoved) {
        if (newFenArray[3].includes('kq')) {
            newFenArray[3] = 'q';
        }
        else if (newFenArray[3].includes('k')) {
            newFenArray[3] = '-';
        }
    }
    if (squares[4].piece.hasMoved) {
        newFenArray[3] = '-';
    }
}

function rookCastle(newSquares, selectedPiece, index) {
    if (newSquares[selectedPiece].piece.pieceType === 'k' || newSquares[selectedPiece].piece.pieceType === 'K') {
        if (newSquares[selectedPiece].piece.pieceType === 'k' && index === 2) {
            newSquares[0].piece.pieceType = '';
            newSquares[0].piece.hasMoved = true;
            newSquares[3].piece.pieceType = 'r';
            newSquares[3].piece.hasMoved = true;
        }

        if (newSquares[selectedPiece].piece.pieceType === 'k' && index === 6) {
            newSquares[7].piece.pieceType = '';
            newSquares[7].piece.hasMoved = true;
            newSquares[5].piece.pieceType = 'r';
            newSquares[5].piece.hasMoved = true;
        }

        if (newSquares[selectedPiece].piece.pieceType === 'K' && index === 62) {
            newSquares[63].piece.pieceType = '';
            newSquares[63].piece.hasMoved = true;
            newSquares[61].piece.pieceType = 'R';
            newSquares[61].piece.hasMoved = true;
        }

        if (newSquares[selectedPiece].piece.pieceType === 'K' && index === 58) {
            newSquares[56].piece.pieceType = '';
            newSquares[56].piece.hasMoved = true;
            newSquares[59].piece.pieceType = 'R';
            newSquares[59].piece.hasMoved = true;
        }

    }
}

export {
    MoveDirectional,
    PawnTake, PawnMoveUp, PawnMoveDown, MovePiece, Castle,
    PotentialEnPassant, PotentialMoves
}