import { ResetPassant } from "../../../Utilities/ResetPassant/ResetPassant";
import { IsOnRightEdge } from "../../../Utilities/IsOnEdge/IsOnRightEdge";
import { IsOnLeftEdge } from "../../../Utilities/IsOnEdge/IsOnLeftEdge";
import { IsOnBottomEdge } from "../../../Utilities/IsOnEdge/IsOnBottomEdge";
import { IsOnTopEdge } from "../../../Utilities/IsOnEdge/IsOnTopEdge";
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
                    PawnMoveUp(squares, index, 0, 2, potentialMoves, true)
                }
                else {
                    PawnMoveUp(squares, index, 0, 1, potentialMoves, true)
                }
            }
            PawnTake(squares, index, potentialMoves)
            break;

        case 'R':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, true, isJustThreaten, newFenArray)
            break;

        case 'N':
            KnightMove(squares, index, potentialMoves)
            break;

        case 'B':
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, true, isJustThreaten, newFenArray)
            break;

        case 'Q':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, true, isJustThreaten, newFenArray)
            break;

        case 'K':
            MoveDirectional(squares, index, 0, 1, up, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, down, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, left, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, right, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, upLeft, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, upRight, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, downLeft, potentialMoves, true, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, downRight, potentialMoves, true, isJustThreaten, newFenArray)
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
            PawnTake(squares, index, potentialMoves)
            break;

        case 'r':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, false, isJustThreaten, newFenArray)
            break;

        case 'n':
            KnightMove(squares, index, potentialMoves)
            break;

        case 'b':
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, false, isJustThreaten, newFenArray)
            break;

        case 'q':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, false, isJustThreaten, newFenArray)
            break;

        case 'k':
            MoveDirectional(squares, index, 0, 1, up, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, down, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, left, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, right, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, upLeft, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, upRight, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, downLeft, potentialMoves, false, isJustThreaten, newFenArray)
            MoveDirectional(squares, index, 0, 1, downRight, potentialMoves, false, isJustThreaten, newFenArray)
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

function MoveDirectional(squares, index, count, maxDepth, direction, potentialMoves, originalPieceWhite, isJustThreaten, newFenArray) {
    let moveTo = index + direction;

    let moveRight = false;
    let moveLeft = false;
    let moveUp = false;
    let moveDown = false;

    if (direction === right || direction === upRight || direction === downRight) {
        moveRight = true;
    }

    if (direction === left || direction === upLeft || direction === downLeft) {
        moveLeft = true;
    }

    if (count < maxDepth) {
        if (moveTo >= 0 && moveTo <= 63) {
            if ((moveRight && !IsOnRightEdge(squares, index)) || (moveLeft && !IsOnLeftEdge(squares, index)) || (!moveLeft && !moveRight)) {
                if (originalPieceWhite) {
                    if (isJustThreaten) {
                        if (squares[moveTo].piece.pieceType === '') {
                            potentialMoves.push(moveTo);
                            MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite, isJustThreaten);
                        }
                        else if (!IsWhite(squares[moveTo].piece.pieceType)) {
                            potentialMoves.push(moveTo);
                        }
                    }
                    else {
                        if (squares[moveTo].piece.pieceType === '') {
                            AddPotentialMove(squares, index, moveTo, potentialMoves, originalPieceWhite, newFenArray);
                            MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite, isJustThreaten);
                        }
                        else if (!IsWhite(squares[moveTo].piece.pieceType)) {
                            AddPotentialMove(squares, index, moveTo, potentialMoves, originalPieceWhite, newFenArray);
                        }
                    }
                }
                else {
                    if (isJustThreaten) {
                        if (squares[moveTo].piece.pieceType === '') {
                            potentialMoves.push(moveTo);
                            MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite, isJustThreaten);
                        }
                        else if (!IsWhite(squares[moveTo].piece.pieceType)) {
                            potentialMoves.push(moveTo);
                        }
                    }
                    else {
                        if (squares[moveTo].piece.pieceType === '') {
                            AddPotentialMove(squares, index, moveTo, potentialMoves, originalPieceWhite, newFenArray);
                            MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite, isJustThreaten);
                        }
                        else if (IsWhite(squares[moveTo].piece.pieceType)) {
                            AddPotentialMove(squares, index, moveTo, potentialMoves, originalPieceWhite, newFenArray);
                        }
                    }
                }
            }
        }
    }
    return -1;
}

function KnightMove(squares, index, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    if (index - 16 >= 0) {
        if (squares[index - 16].position[0] !== 'H') {
            if (isWhite) {
                if (squares[index - 15].piece.pieceType === '') {
                    potentialMoves.push(index - 15);
                }
                else if (!isUpperCase(squares[index - 15].piece.pieceType)) {
                    potentialMoves.push(index - 15);
                }
            }
            else {
                if (squares[index - 15].piece.pieceType === '') {
                    potentialMoves.push(index - 15);

                }
                else if (isUpperCase(squares[index - 15].piece.pieceType)) {
                    potentialMoves.push(index - 15);
                }
            }
        }
        if (squares[index - 16].position[0] !== 'A') {
            if (isWhite) {
                if (squares[index - 17].piece.pieceType === '') {
                    potentialMoves.push(index - 17);
                }
                else if (!isUpperCase(squares[index - 17].piece.pieceType)) {
                    potentialMoves.push(index - 17);
                }
            }
            else {
                if (squares[index - 17].piece.pieceType === '') {
                    potentialMoves.push(index - 17);

                }
                else if (isUpperCase(squares[index - 17].piece.pieceType)) {
                    potentialMoves.push(index - 17);
                }
            }
        }
    }
    if (index + 16 <= 63) {
        if (squares[index + 16].position[0] !== 'H') {
            if (isWhite) {
                if (squares[index + 17].piece.pieceType === '') {
                    potentialMoves.push(index + 17);
                }
                else if (!isUpperCase(squares[index + 17].piece.pieceType)) {
                    potentialMoves.push(index + 17);
                }
            }
            else {
                if (squares[index + 17].piece.pieceType === '') {
                    potentialMoves.push(index + 17);

                }
                else if (isUpperCase(squares[index + 17].piece.pieceType)) {
                    potentialMoves.push(index + 17);
                }
            }
        }
        if (squares[index + 16].position[0] !== 'A') {
            if (isWhite) {
                if (squares[index + 15].piece.pieceType === '') {
                    potentialMoves.push(index + 15);
                }
                else if (!isUpperCase(squares[index + 15].piece.pieceType)) {
                    potentialMoves.push(index + 15);
                }
            }
            else {
                if (squares[index + 15].piece.pieceType === '') {
                    potentialMoves.push(index + 15);

                }
                else if (isUpperCase(squares[index + 15].piece.pieceType)) {
                    potentialMoves.push(index + 15);
                }
            }
        }
    }
    if (index - 8 >= 0) {
        if (squares[index - 8].position[0] !== 'H') {
            if (squares[index - 7].position[0] !== 'H') {
                if (isWhite) {
                    if (squares[index - 6].piece.pieceType === '') {
                        potentialMoves.push(index - 6);
                    }
                    else if (!isUpperCase(squares[index - 6].piece.pieceType)) {
                        potentialMoves.push(index - 6);
                    }
                }
                else {
                    if (squares[index - 6].piece.pieceType === '') {
                        potentialMoves.push(index - 6);

                    }
                    else if (isUpperCase(squares[index - 6].piece.pieceType)) {
                        potentialMoves.push(index - 6);
                    }
                }
            }
        }
        if (squares[index - 8].position[0] !== 'A') {
            if (squares[index - 9].position[0] !== 'A') {
                if (isWhite) {
                    if (squares[index - 10].piece.pieceType === '') {
                        potentialMoves.push(index - 10);
                    }
                    else if (!isUpperCase(squares[index - 10].piece.pieceType)) {
                        potentialMoves.push(index - 10);
                    }
                }
                else {
                    if (squares[index - 10].piece.pieceType === '') {
                        potentialMoves.push(index - 10);

                    }
                    else if (isUpperCase(squares[index - 10].piece.pieceType)) {
                        potentialMoves.push(index - 10);
                    }
                }
            }
        }
    }
    if (index + 8 <= 63) {
        if (squares[index + 8].position[0] !== 'A') {
            if (squares[index + 7].position[0] !== 'A') {
                if (isWhite) {
                    if (squares[index + 6].piece.pieceType === '') {
                        potentialMoves.push(index + 6);
                    }
                    else if (!isUpperCase(squares[index + 6].piece.pieceType)) {
                        potentialMoves.push(index + 6);
                    }
                }
                else {
                    if (squares[index + 6].piece.pieceType === '') {
                        potentialMoves.push(index + 6);

                    }
                    else if (isUpperCase(squares[index + 6].piece.pieceType)) {
                        potentialMoves.push(index + 6);
                    }
                }
            }
        }
        if (squares[index + 8].position[0] !== 'H') {
            if (squares[index + 9].position[0] !== 'H') {
                if (isWhite) {
                    if (squares[index + 10].piece.pieceType === '') {
                        potentialMoves.push(index + 10);
                    }
                    else if (!isUpperCase(squares[index + 10].piece.pieceType)) {
                        potentialMoves.push(index + 10);
                    }
                }
                else {
                    if (squares[index + 10].piece.pieceType === '') {
                        potentialMoves.push(index + 10);

                    }
                    else if (isUpperCase(squares[index + 10].piece.pieceType)) {
                        potentialMoves.push(index + 10);
                    }
                }
            }
        }
    }
    return -1;
}

function PawnTake(squares, index, potentialMoves) {
    const isUpperCase = str => str === (str.toUpperCase());
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    if (isWhite) {
        if (squares[index].position[0] !== 'A') {
            if (index - 9 >= 0) {
                if (!isUpperCase(squares[index - 9].piece.pieceType)) {
                    potentialMoves.push(index - 9);
                }
            }
            if (squares[index - 1].piece.potentialPassant) {
                potentialMoves.push(index - 9);
            }
        }
        if (squares[index].position[0] !== 'H') {
            if (index - 7 >= 0) {
                if (!isUpperCase(squares[index - 7].piece.pieceType)) {
                    potentialMoves.push(index - 7);
                }
                if (squares[index + 1].piece.potentialPassant) {
                    potentialMoves.push(index - 7);
                }
            }
        }

    }
    else {
        if (squares[index].position[0] !== 'A') {
            if (index + 7 <= 63) {
                if (isUpperCase(squares[index + 7].piece.pieceType) && squares[index + 7].piece.pieceType !== '') {
                    potentialMoves.push(index + 7);
                }
                if (squares[index - 1].piece.potentialPassant) {
                    potentialMoves.push(index + 7);
                }
            }
        }
        if (squares[index].position[0] !== 'H') {
            if (index + 9 <= 63) {
                if (isUpperCase(squares[index + 9].piece.pieceType) && squares[index + 9].piece.pieceType !== '') {
                    potentialMoves.push(index + 9);
                }
                if (squares[index + 1].piece.potentialPassant) {
                    potentialMoves.push(index + 9);
                }
            }
        }
    }
    return -1;
}

function PawnMoveUp(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    let moveTo = index + up;
    if (count < maxDepth) {
        if (moveTo >= 0) {
            if (originalPieceWhite) {
                if (squares[moveTo].piece.pieceType === '') {
                    potentialMoves.push(moveTo);
                    PawnMoveUp(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
            }
            else {
                if (squares[moveTo].piece.pieceType === '') {
                    potentialMoves.push(moveTo);
                    PawnMoveUp(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite);
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