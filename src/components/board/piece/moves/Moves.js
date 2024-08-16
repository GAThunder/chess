import { ResetPassant } from "../../../Utilities/ResetPassant/ResetPassant";

function PotentialMoves(squares, index,) {
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
            MoveUp(squares, index, 0, 8, potentialMoves, true)
            MoveDown(squares, index, 0, 8, potentialMoves, true)
            MoveLeft(squares, index, 0, 8, potentialMoves, true)
            MoveRight(squares, index, 0, 8, potentialMoves, true)
            break;

        case 'N':
            KnightMove(squares, index, potentialMoves)
            break;

        case 'B':
            MoveUpLeft(squares, index, 0, 8, potentialMoves, true)
            MoveDownLeft(squares, index, 0, 8, potentialMoves, true)
            MoveUpRight(squares, index, 0, 8, potentialMoves, true)
            MoveDownRight(squares, index, 0, 8, potentialMoves, true)
            break;

        case 'Q':
            MoveUp(squares, index, 0, 8, potentialMoves, true)
            MoveDown(squares, index, 0, 8, potentialMoves, true)
            MoveLeft(squares, index, 0, 8, potentialMoves, true)
            MoveRight(squares, index, 0, 8, potentialMoves, true)
            MoveUpLeft(squares, index, 0, 8, potentialMoves, true)
            MoveDownLeft(squares, index, 0, 8, potentialMoves, true)
            MoveUpRight(squares, index, 0, 8, potentialMoves, true)
            MoveDownRight(squares, index, 0, 8, potentialMoves, true)
            break;

        case 'K':
            MoveUp(squares, index, 0, 1, potentialMoves, true)
            MoveDown(squares, index, 0, 1, potentialMoves, true)
            MoveLeft(squares, index, 0, 1, potentialMoves, true)
            MoveRight(squares, index, 0, 1, potentialMoves, true)
            MoveUpLeft(squares, index, 0, 1, potentialMoves, true)
            MoveDownLeft(squares, index, 0, 1, potentialMoves, true)
            MoveUpRight(squares, index, 0, 1, potentialMoves, true)
            MoveDownRight(squares, index, 0, 1, potentialMoves, true)
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
            MoveUp(squares, index, 0, 8, potentialMoves, false)
            MoveDown(squares, index, 0, 8, potentialMoves, false)
            MoveLeft(squares, index, 0, 8, potentialMoves, false)
            MoveRight(squares, index, 0, 8, potentialMoves, false)
            break;

        case 'n':
            KnightMove(squares, index, potentialMoves)
            break;

        case 'b':
            MoveUpLeft(squares, index, 0, 8, potentialMoves, false)
            MoveDownLeft(squares, index, 0, 8, potentialMoves, false)
            MoveUpRight(squares, index, 0, 8, potentialMoves, false)
            MoveDownRight(squares, index, 0, 8, potentialMoves, false)
            break;

        case 'q':
            MoveUp(squares, index, 0, 8, potentialMoves, false)
            MoveDown(squares, index, 0, 8, potentialMoves, false)
            MoveLeft(squares, index, 0, 8, potentialMoves, false)
            MoveRight(squares, index, 0, 8, potentialMoves, false)
            MoveUpLeft(squares, index, 0, 8, potentialMoves, false)
            MoveDownLeft(squares, index, 0, 8, potentialMoves, false)
            MoveUpRight(squares, index, 0, 8, potentialMoves, false)
            MoveDownRight(squares, index, 0, 8, potentialMoves, false)
            break;

        case 'k':
            MoveUp(squares, index, 0, 1, potentialMoves, false)
            MoveDown(squares, index, 0, 1, potentialMoves, false)
            MoveLeft(squares, index, 0, 1, potentialMoves, false)
            MoveRight(squares, index, 0, 1, potentialMoves, false)
            MoveUpLeft(squares, index, 0, 1, potentialMoves, false)
            MoveDownLeft(squares, index, 0, 1, potentialMoves, false)
            MoveUpRight(squares, index, 0, 1, potentialMoves, false)
            MoveDownRight(squares, index, 0, 1, potentialMoves, false)
            break;
    }

    return potentialMoves;
}

function MovePiece(newSquares, index, selectedPiece, newFenArray) {
    let FenPassant = newFenArray[3];
    if (FenPassant !== '-') {
        if (newSquares[selectedPiece].piece.pieceType == 'p') {
            if (newSquares[index].position === FenPassant) {
                newSquares[index - 8].piece.pieceType = '';
            }
        }
        if (newSquares[selectedPiece].piece.pieceType == 'P') {
            if (newSquares[index].position === FenPassant) {
                newSquares[index + 8].piece.pieceType = '';
            }
        }
    }
    ResetPassant(newSquares, newFenArray)
    PotentialEnPassant(newSquares, index, selectedPiece, newFenArray);
    newSquares[index].piece.pieceType = newSquares[selectedPiece].piece.pieceType;
    newSquares[index].piece.hasMoved = true;
    newSquares[selectedPiece].piece.pieceType = '';
}

//Update to pass original selections color as well. Right now for black pieces it treats them as white pieces after the first recursion on a blank space

function MoveUp(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 8 >= 0) {
            if (originalPieceWhite) {
                if (updatedSquares[index - 8].piece.pieceType === '') {
                    potentialMoves.push(index - 8);
                    MoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
                else if (!isUpperCase(updatedSquares[index - 8].piece.pieceType)) {
                    potentialMoves.push(index - 8);
                }
            }
            else {
                if (updatedSquares[index - 8].piece.pieceType === '') {
                    potentialMoves.push(index - 8);
                    MoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
                else if (isUpperCase(updatedSquares[index - 8].piece.pieceType)) {
                    potentialMoves.push(index - 8);
                }
            }
        }
    }
    return -1;
}

function MoveDown(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 8 <= 63) {
            if (originalPieceWhite) {
                if (updatedSquares[index + 8].piece.pieceType === '') {
                    potentialMoves.push(index + 8);
                    MoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
                else if (!isUpperCase(updatedSquares[index + 8].piece.pieceType)) {
                    potentialMoves.push(index + 8);
                }
            }
            else {
                if (updatedSquares[index + 8].piece.pieceType === '') {
                    potentialMoves.push(index + 8);
                    MoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
                else if (isUpperCase(updatedSquares[index + 8].piece.pieceType)) {
                    potentialMoves.push(index + 8);
                }
            }
        }
    }

    return -1;
}

function MoveRight(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 1 <= 63) {
            if (updatedSquares[index].position[0] !== 'H') {
                if (originalPieceWhite) {
                    if (updatedSquares[index + 1].piece.pieceType === '') {
                        potentialMoves.push(index + 1);
                        MoveRight(squares, index + 1, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (!isUpperCase(updatedSquares[index + 1].piece.pieceType)) {
                        potentialMoves.push(index + 1);
                    }
                }
                else {
                    if (updatedSquares[index + 1].piece.pieceType === '') {
                        potentialMoves.push(index + 1);
                        MoveRight(squares, index + 1, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (isUpperCase(updatedSquares[index + 1].piece.pieceType)) {
                        potentialMoves.push(index + 1);
                    }
                }
            }
        }
    }
    return -1;
}

function MoveLeft(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 1 >= 0) {
            if (updatedSquares[index].position[0] !== 'A') {
                if (originalPieceWhite) {
                    if (updatedSquares[index - 1].piece.pieceType === '') {
                        potentialMoves.push(index - 1);
                        MoveLeft(squares, index - 1, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (!isUpperCase(updatedSquares[index - 1].piece.pieceType)) {
                        potentialMoves.push(index - 1);
                    }
                }
                else {
                    if (updatedSquares[index - 1].piece.pieceType === '') {
                        potentialMoves.push(index - 1);
                        MoveLeft(squares, index - 1, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (isUpperCase(updatedSquares[index - 1].piece.pieceType)) {
                        potentialMoves.push(index - 1);
                    }
                }
            }
        }
    }

    return -1;
}

function MoveUpLeft(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 9 >= 0) {
            if (updatedSquares[index].position[0] !== 'A') {
                if (originalPieceWhite) {
                    if (updatedSquares[index - 9].piece.pieceType === '') {
                        potentialMoves.push(index - 9);
                        MoveUpLeft(squares, index - 9, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (!isUpperCase(updatedSquares[index - 9].piece.pieceType)) {
                        potentialMoves.push(index - 9);
                    }
                }
                else {
                    if (updatedSquares[index - 9].piece.pieceType === '') {
                        potentialMoves.push(index - 9);
                        MoveUpLeft(squares, index - 9, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (isUpperCase(updatedSquares[index - 9].piece.pieceType)) {
                        potentialMoves.push(index - 9);
                    }
                }
            }
        }
    }

    return -1;
}

function MoveDownLeft(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 7 <= 63) {
            if (updatedSquares[index].position[0] !== 'A') {
                if (originalPieceWhite) {
                    if (updatedSquares[index + 7].piece.pieceType === '') {
                        potentialMoves.push(index + 7);
                        MoveDownLeft(squares, index + 7, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (!isUpperCase(updatedSquares[index + 7].piece.pieceType)) {
                        potentialMoves.push(index + 7);

                    }
                }
                else {
                    if (updatedSquares[index + 7].piece.pieceType === '') {
                        potentialMoves.push(index + 7);
                        MoveDownLeft(squares, index + 7, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (isUpperCase(updatedSquares[index + 7].piece.pieceType)) {
                        potentialMoves.push(index + 7);

                    }
                }
            }
        }
    }

    return -1;
}

function MoveUpRight(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 7 >= 0) {
            if (updatedSquares[index].position[0] !== 'H') {
                if (originalPieceWhite) {
                    if (updatedSquares[index - 7].piece.pieceType === '') {
                        potentialMoves.push(index - 7);
                        MoveUpRight(squares, index - 7, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (!isUpperCase(updatedSquares[index - 7].piece.pieceType)) {
                        potentialMoves.push(index - 7);

                    }
                }
                else {
                    if (updatedSquares[index - 7].piece.pieceType === '') {
                        potentialMoves.push(index - 7);
                        MoveUpRight(squares, index - 7, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (isUpperCase(updatedSquares[index - 7].piece.pieceType)) {
                        potentialMoves.push(index - 7);
                    }
                }
            }
        }
    }

    return -1;
}

function MoveDownRight(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    const isUpperCase = str => str === str.toUpperCase();
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 9 <= 63) {
            if (updatedSquares[index].position[0] !== 'H') {
                if (originalPieceWhite) {
                    if (updatedSquares[index + 9].piece.pieceType === '') {
                        potentialMoves.push(index + 9);
                        MoveDownRight(squares, index + 9, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (!isUpperCase(updatedSquares[index + 9].piece.pieceType)) {
                        potentialMoves.push(index + 9);

                    }
                }
                else {
                    if (updatedSquares[index + 9].piece.pieceType === '') {
                        potentialMoves.push(index + 9);
                        MoveDownRight(squares, index + 9, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                    }
                    else if (isUpperCase(updatedSquares[index + 9].piece.pieceType)) {
                        potentialMoves.push(index + 9);

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
    if (count < maxDepth) {
        if (index - 8 >= 0) {
            if (originalPieceWhite) {
                if (updatedSquares[index - 8].piece.pieceType === '') {
                    potentialMoves.push(index - 8);
                    PawnMoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
            }
            else {
                if (updatedSquares[index - 8].piece.pieceType === '') {
                    potentialMoves.push(index - 8);
                    PawnMoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }
            }
        }

    }
    return -1;
}

function PawnMoveDown(squares, index, count, maxDepth, potentialMoves, originalPieceWhite) {
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 8 <= 63) {
            if (originalPieceWhite) {
                if (updatedSquares[index + 8].piece.pieceType === '') {
                    potentialMoves.push(index + 8);
                    PawnMoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }

            }
            else {
                if (updatedSquares[index + 8].piece.pieceType === '') {
                    potentialMoves.push(index + 8);
                    PawnMoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves, originalPieceWhite);
                }

            }
        }
    }

    return -1;
}

function PotentialEnPassant(squares, index, selectedPiece, newFenArray) {
    console.log(index, selectedPiece);
    if (squares[selectedPiece].piece.pieceType == 'P') {
        if (selectedPiece - index === 16) {
            if (squares[index].position[0] !== 'H') {
                if (squares[index + 1].piece.pieceType == 'p') {
                    newFenArray[3] = squares[index + 8].position;
                    squares[index].piece.potentialPassant = true;
                }
            }
            if (squares[index].position[0] !== 'A') {
                if (squares[index - 1].piece.pieceType == 'p') {
                    newFenArray[3] = squares[index + 8].position;
                    squares[index].piece.potentialPassant = true;
                }
            }

        }
    }

    if (squares[selectedPiece].piece.pieceType == 'p') {
        if (selectedPiece - index === -16) {
            if (squares[index].position[0] !== 'H') {
                if (squares[index + 1].piece.pieceType == 'P') {
                    newFenArray[3] = squares[index - 8].position;
                    squares[index].piece.potentialPassant = true;
                }
            }
            if (squares[index].position[0] !== 'A') {
                if (squares[index - 1].piece.pieceType == 'P') {
                    newFenArray[3] = squares[index - 8].position;
                    squares[index].piece.potentialPassant = true;
                }
            }

        }
    }

}

export {
    MoveUp, MoveDown, MoveRight, MoveLeft,
    MoveUpLeft, MoveDownLeft, MoveUpRight, MoveDownRight,
    PawnTake, PawnMoveUp, PawnMoveDown, MovePiece,
    PotentialEnPassant, PotentialMoves
}