import { ResetPassant } from "../../../Utilities/ResetPassant/ResetPassant";
import { LocateKing } from "../../../Utilities/LocateKing/LocateKing";
import { IsOnRightEdge } from "../../../Utilities/IsOnEdge/IsOnRightEdge";
import { IsOnLeftEdge } from "../../../Utilities/IsOnEdge/IsOnLeftEdge";

/*TODO I should have one move function that takes the direction as a parameter, and checks edges of board on each move. It'll make it cleaner and easier to maintain.
With that goal in mind, I should also make one function for moves, that returns potential moves, and one function that just returns where the piece is currently threatening.
That way the moves can be simulated, and I can also return the opponents potential moves without creating an infinite loop. */

const up = -8;
const down = 8;
const left = -1;
const right = 1;
const upLeft = -9;
const upRight = -7;
const downLeft = 7;
const downRight = 9;

function PotentialMoves(squares, index, newFenArray) {
    let potentialMoves = [];
    switch (squares[index].piece.pieceType) {
        case 'P':
            if (!squares[index].piece.hasMoved) {
                PawnMoveUp(squares, index, 0, 2, potentialMoves, true)
            }
            else {
                PawnMoveUp(squares, index, 0, 1, potentialMoves, true)
            }
            PawnTake(squares, index, potentialMoves)
            break;

        case 'R':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, true)
            break;

        case 'N':
            KnightMove(squares, index, potentialMoves)
            break;

        case 'B':
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, true)
            break;

        case 'Q':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, true)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, true)
            break;

        case 'K':
            MoveDirectional(squares, index, 0, 1, up, potentialMoves, true)
            MoveDirectional(squares, index, 0, 1, down, potentialMoves, true)
            MoveDirectional(squares, index, 0, 1, left, potentialMoves, true)
            MoveDirectional(squares, index, 0, 1, right, potentialMoves, true)
            MoveDirectional(squares, index, 0, 1, upLeft, potentialMoves, true)
            MoveDirectional(squares, index, 0, 1, upRight, potentialMoves, true)
            MoveDirectional(squares, index, 0, 1, downLeft, potentialMoves, true)
            MoveDirectional(squares, index, 0, 1, downRight, potentialMoves, true)
            Castle(squares, newFenArray, potentialMoves, true)
            break;

        case 'p':
            if (!squares[index].piece.hasMoved) {
                PawnMoveDown(squares, index, 0, 2, potentialMoves, true)
            }
            else {
                PawnMoveDown(squares, index, 0, 1, potentialMoves, true)
            }
            PawnTake(squares, index, potentialMoves)
            break;

        case 'r':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, false)
            break;

        case 'n':
            KnightMove(squares, index, potentialMoves)
            break;

        case 'b':
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, false)
            break;

        case 'q':
            MoveDirectional(squares, index, 0, 8, up, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, down, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, left, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, right, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, upLeft, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, upRight, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, downLeft, potentialMoves, false)
            MoveDirectional(squares, index, 0, 8, downRight, potentialMoves, false)
            break;

        case 'k':
            MoveDirectional(squares, index, 0, 1, up, potentialMoves, false)
            MoveDirectional(squares, index, 0, 1, down, potentialMoves, false)
            MoveDirectional(squares, index, 0, 1, left, potentialMoves, false)
            MoveDirectional(squares, index, 0, 1, right, potentialMoves, false)
            MoveDirectional(squares, index, 0, 1, upLeft, potentialMoves, false)
            MoveDirectional(squares, index, 0, 1, upRight, potentialMoves, false)
            MoveDirectional(squares, index, 0, 1, downLeft, potentialMoves, false)
            MoveDirectional(squares, index, 0, 1, downRight, potentialMoves, false)
            Castle(squares, newFenArray, potentialMoves, false)
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

//Update to pass original selections color as well. Right now for black pieces it treats them as white pieces after the first recursion on a blank space
function MoveDirectional(squares, index, count, maxDepth, direction, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    let moveTo = index + direction;
    let moveRight = false;
    let moveLeft = false;

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
                    if (updatedSquares[moveTo].piece.pieceType === '') {
                        potentialMoves.push(moveTo);
                        MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite);
                    }
                    else if (!isUpperCase(updatedSquares[moveTo].piece.pieceType)) {
                        potentialMoves.push(moveTo);
                    }
                }
                else {
                    if (updatedSquares[moveTo].piece.pieceType === '') {
                        potentialMoves.push(moveTo);
                        MoveDirectional(squares, moveTo, count + 1, maxDepth, direction, potentialMoves, originalPieceWhite);
                    }
                    else if (isUpperCase(updatedSquares[moveTo].piece.pieceType)) {
                        potentialMoves.push(moveTo);
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
    let updatedSquares = [...squares];
    if (index - 16 >= 0) {
        if (updatedSquares[index - 16].position[0] !== 'H') {
            if (isWhite) {
                if (updatedSquares[index - 15].piece.pieceType === '') {
                    potentialMoves.push(index - 15);
                }
                else if (!isUpperCase(updatedSquares[index - 15].piece.pieceType)) {
                    potentialMoves.push(index - 15);
                }
            }
            else {
                if (updatedSquares[index - 15].piece.pieceType === '') {
                    potentialMoves.push(index - 15);

                }
                else if (isUpperCase(updatedSquares[index - 15].piece.pieceType)) {
                    potentialMoves.push(index - 15);
                }
            }
        }
        if (updatedSquares[index - 16].position[0] !== 'A') {
            if (isWhite) {
                if (updatedSquares[index - 17].piece.pieceType === '') {
                    potentialMoves.push(index - 17);
                }
                else if (!isUpperCase(updatedSquares[index - 17].piece.pieceType)) {
                    potentialMoves.push(index - 17);
                }
            }
            else {
                if (updatedSquares[index - 17].piece.pieceType === '') {
                    potentialMoves.push(index - 17);

                }
                else if (isUpperCase(updatedSquares[index - 17].piece.pieceType)) {
                    potentialMoves.push(index - 17);
                }
            }
        }
    }
    if (index + 16 <= 63) {
        if (updatedSquares[index + 16].position[0] !== 'H') {
            if (isWhite) {
                if (updatedSquares[index + 17].piece.pieceType === '') {
                    potentialMoves.push(index + 17);
                }
                else if (!isUpperCase(updatedSquares[index + 17].piece.pieceType)) {
                    potentialMoves.push(index + 17);
                }
            }
            else {
                if (updatedSquares[index + 17].piece.pieceType === '') {
                    potentialMoves.push(index + 17);

                }
                else if (isUpperCase(updatedSquares[index + 17].piece.pieceType)) {
                    potentialMoves.push(index + 17);
                }
            }
        }
        if (updatedSquares[index + 16].position[0] !== 'A') {
            if (isWhite) {
                if (updatedSquares[index + 15].piece.pieceType === '') {
                    potentialMoves.push(index + 15);
                }
                else if (!isUpperCase(updatedSquares[index + 15].piece.pieceType)) {
                    potentialMoves.push(index + 15);
                }
            }
            else {
                if (updatedSquares[index + 15].piece.pieceType === '') {
                    potentialMoves.push(index + 15);

                }
                else if (isUpperCase(updatedSquares[index + 15].piece.pieceType)) {
                    potentialMoves.push(index + 15);
                }
            }
        }
    }
    if (index - 8 >= 0) {
        if (updatedSquares[index - 8].position[0] !== 'H') {
            if (updatedSquares[index - 7].position[0] !== 'H') {
                if (isWhite) {
                    if (updatedSquares[index - 6].piece.pieceType === '') {
                        potentialMoves.push(index - 6);
                    }
                    else if (!isUpperCase(updatedSquares[index - 6].piece.pieceType)) {
                        potentialMoves.push(index - 6);
                    }
                }
                else {
                    if (updatedSquares[index - 6].piece.pieceType === '') {
                        potentialMoves.push(index - 6);

                    }
                    else if (isUpperCase(updatedSquares[index - 6].piece.pieceType)) {
                        potentialMoves.push(index - 6);
                    }
                }
            }
        }
        if (updatedSquares[index - 8].position[0] !== 'A') {
            if (updatedSquares[index - 9].position[0] !== 'A') {
                if (isWhite) {
                    if (updatedSquares[index - 10].piece.pieceType === '') {
                        potentialMoves.push(index - 10);
                    }
                    else if (!isUpperCase(updatedSquares[index - 10].piece.pieceType)) {
                        potentialMoves.push(index - 10);
                    }
                }
                else {
                    if (updatedSquares[index - 10].piece.pieceType === '') {
                        potentialMoves.push(index - 10);

                    }
                    else if (isUpperCase(updatedSquares[index - 10].piece.pieceType)) {
                        potentialMoves.push(index - 10);
                    }
                }
            }
        }
    }
    if (index + 8 <= 63) {
        if (updatedSquares[index + 8].position[0] !== 'A') {
            if (updatedSquares[index + 7].position[0] !== 'A') {
                if (isWhite) {
                    if (updatedSquares[index + 6].piece.pieceType === '') {
                        potentialMoves.push(index + 6);
                    }
                    else if (!isUpperCase(updatedSquares[index + 6].piece.pieceType)) {
                        potentialMoves.push(index + 6);
                    }
                }
                else {
                    if (updatedSquares[index + 6].piece.pieceType === '') {
                        potentialMoves.push(index + 6);

                    }
                    else if (isUpperCase(updatedSquares[index + 6].piece.pieceType)) {
                        potentialMoves.push(index + 6);
                    }
                }
            }
        }
        if (updatedSquares[index + 8].position[0] !== 'H') {
            if (updatedSquares[index + 9].position[0] !== 'H') {
                if (isWhite) {
                    if (updatedSquares[index + 10].piece.pieceType === '') {
                        potentialMoves.push(index + 10);
                    }
                    else if (!isUpperCase(updatedSquares[index + 10].piece.pieceType)) {
                        potentialMoves.push(index + 10);
                    }
                }
                else {
                    if (updatedSquares[index + 10].piece.pieceType === '') {
                        potentialMoves.push(index + 10);

                    }
                    else if (isUpperCase(updatedSquares[index + 10].piece.pieceType)) {
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
    let updatedSquares = [...squares];
    if (isWhite) {
        if (updatedSquares[index].position[0] !== 'A') {
            if (index - 9 >= 0) {
                if (!isUpperCase(updatedSquares[index - 9].piece.pieceType)) {
                    potentialMoves.push(index - 9);
                }
            }
            if (updatedSquares[index - 1].piece.potentialPassant) {
                potentialMoves.push(index - 9);
            }
        }
        if (updatedSquares[index].position[0] !== 'H') {
            if (index - 7 >= 0) {
                if (!isUpperCase(updatedSquares[index - 7].piece.pieceType)) {
                    potentialMoves.push(index - 7);
                }
                if (updatedSquares[index + 1].piece.potentialPassant) {
                    potentialMoves.push(index - 7);
                }
            }
        }

    }
    else {
        if (updatedSquares[index].position[0] !== 'A') {
            if (index + 7 <= 63) {
                if (isUpperCase(updatedSquares[index + 7].piece.pieceType) && updatedSquares[index + 7].piece.pieceType !== '') {
                    potentialMoves.push(index + 7);
                }
                if (updatedSquares[index - 1].piece.potentialPassant) {
                    potentialMoves.push(index + 7);
                }
            }
        }
        if (updatedSquares[index].position[0] !== 'H') {
            if (index + 9 <= 63) {
                if (isUpperCase(updatedSquares[index + 9].piece.pieceType) && updatedSquares[index + 9].piece.pieceType !== '') {
                    potentialMoves.push(index + 9);
                }
                if (updatedSquares[index + 1].piece.potentialPassant) {
                    potentialMoves.push(index + 9);
                }
            }
        }
    }
    return -1;
}

function PawnMoveUp(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    let updatedSquares = [...squares];
    let moveTo = index + up;
    if (count < maxDepth) {
        if (moveTo >= 0) {
            if (originalPieceWhite) {
                if (updatedSquares[moveTo].piece.pieceType === '') {
                    potentialMoves.push(moveTo);
                    PawnMoveUp(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
            }
            else {
                if (updatedSquares[moveTo].piece.pieceType === '') {
                    potentialMoves.push(moveTo);
                    PawnMoveUp(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
            }
        }

    }
    return -1;
}

function PawnMoveDown(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    let updatedSquares = [...squares];
    let moveTo = index + down;
    if (count < maxDepth) {
        if (moveTo <= 63) {
            if (originalPieceWhite) {
                if (updatedSquares[moveTo].piece.pieceType === '') {
                    potentialMoves.push(moveTo);
                    PawnMoveDown(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }

            }
            else {
                if (updatedSquares[moveTo].piece.pieceType === '') {
                    potentialMoves.push(moveTo);
                    PawnMoveDown(squares, moveTo, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }

            }
        }
    }

    return -1;
}

function PotentialEnPassant(squares, index, selectedPiece, newFenArray) {
    console.log(index, selectedPiece);
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


/*Need to make sure that its a valid castle, and that the spaces between the two are empty. Need to figure out how to trigger it if its selected so the castle moves too. */
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