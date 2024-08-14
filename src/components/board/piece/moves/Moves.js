function PotentialMoves(squares, index) {
    let potentialMoves = [];
    switch (squares[index].piece.pieceType) {
        case 'P':
            if (!squares[index].piece.hasMoved) {
                PawnMoveUp(squares, index, 0, 2, potentialMoves)
            }
            else {
                PawnMoveUp(squares, index, 0, 1, potentialMoves)
            }
            PawnTake(squares, index, potentialMoves)
            break;

        case 'R':
            MoveUp(squares, index, 0, 8, potentialMoves)
            MoveDown(squares, index, 0, 8, potentialMoves)
            MoveLeft(squares, index, 0, 8, potentialMoves)
            MoveRight(squares, index, 0, 8, potentialMoves)
            break;

        case 'N':
            KnightMove(squares, index, potentialMoves)
            break;

        case 'B':
            MoveUpLeft(squares, index, 0, 8, potentialMoves)
            MoveDownLeft(squares, index, 0, 8, potentialMoves)
            MoveUpRight(squares, index, 0, 8, potentialMoves)
            MoveDownRight(squares, index, 0, 8, potentialMoves)
            break;

        case 'Q':
            MoveUp(squares, index, 0, 8, potentialMoves)
            MoveDown(squares, index, 0, 8, potentialMoves)
            MoveLeft(squares, index, 0, 8, potentialMoves)
            MoveRight(squares, index, 0, 8, potentialMoves)
            MoveUpLeft(squares, index, 0, 8, potentialMoves)
            MoveDownLeft(squares, index, 0, 8, potentialMoves)
            MoveUpRight(squares, index, 0, 8, potentialMoves)
            MoveDownRight(squares, index, 0, 8, potentialMoves)
            break;

        case 'K':
            MoveUp(squares, index, 0, 1, potentialMoves)
            MoveDown(squares, index, 0, 1, potentialMoves)
            MoveLeft(squares, index, 0, 1, potentialMoves)
            MoveRight(squares, index, 0, 1, potentialMoves)
            MoveUpLeft(squares, index, 0, 1, potentialMoves)
            MoveDownLeft(squares, index, 0, 1, potentialMoves)
            MoveUpRight(squares, index, 0, 1, potentialMoves)
            MoveDownRight(squares, index, 0, 1, potentialMoves)
            break;

        case 'p':
            if (!squares[index].piece.hasMoved) {
                PawnMoveDown(squares, index, 0, 2, potentialMoves)
            }
            else {
                PawnMoveDown(squares, index, 0, 1, potentialMoves)
            }
            PawnTake(squares, index, potentialMoves)
            break;

        case 'r':
            MoveUp(squares, index, 0, 8, potentialMoves)
            MoveDown(squares, index, 0, 8, potentialMoves)
            MoveLeft(squares, index, 0, 8, potentialMoves)
            MoveRight(squares, index, 0, 8, potentialMoves)
            break;

        case 'n':
            KnightMove(squares, index, potentialMoves)
            break;

        case 'b':
            MoveUpLeft(squares, index, 0, 8, potentialMoves)
            MoveDownLeft(squares, index, 0, 8, potentialMoves)
            MoveUpRight(squares, index, 0, 8, potentialMoves)
            MoveDownRight(squares, index, 0, 8, potentialMoves)
            break;

        case 'q':
            MoveUp(squares, index, 0, 8, potentialMoves)
            MoveDown(squares, index, 0, 8, potentialMoves)
            MoveLeft(squares, index, 0, 8, potentialMoves)
            MoveRight(squares, index, 0, 8, potentialMoves)
            MoveUpLeft(squares, index, 0, 8, potentialMoves)
            MoveDownLeft(squares, index, 0, 8, potentialMoves)
            MoveUpRight(squares, index, 0, 8, potentialMoves)
            MoveDownRight(squares, index, 0, 8, potentialMoves)
            break;

        case 'k':
            MoveUp(squares, index, 0, 1, potentialMoves)
            MoveDown(squares, index, 0, 1, potentialMoves)
            MoveLeft(squares, index, 0, 1, potentialMoves)
            MoveRight(squares, index, 0, 1, potentialMoves)
            MoveUpLeft(squares, index, 0, 1, potentialMoves)
            MoveDownLeft(squares, index, 0, 1, potentialMoves)
            MoveUpRight(squares, index, 0, 1, potentialMoves)
            MoveDownRight(squares, index, 0, 1, potentialMoves)
            break;
    }

    return potentialMoves;
}

//Update to return indexes instead of updating the squares in here, have it pass a number as well, and be recursive, while the conditions aren't met, keep going, so rooks and bishops will get full set

function MoveUp(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 8 >= 0) {
            if (isWhite) {
                if (updatedSquares[index - 8].piece.pieceType === '') {
                    potentialMoves.push(index - 8);
                    MoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves);
                }
                else if (!isUpperCase(updatedSquares[index - 8].piece.pieceType)) {
                    potentialMoves.push(index - 8);
                    MoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves);
                }
            }
            else {
                if (updatedSquares[index - 8].piece.pieceType === '') {
                    potentialMoves.push(index - 8);
                    MoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves);
                }
                else if (isUpperCase(updatedSquares[index - 8].piece.pieceType)) {
                    potentialMoves.push(index - 8);
                    MoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves);
                }
            }
        }
    }
    return -1;
}

function MoveDown(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 8 <= 63) {
            if (isWhite) {
                if (updatedSquares[index + 8].piece.pieceType === '') {
                    potentialMoves.push(index + 8);
                    MoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves);
                }
                else if (!isUpperCase(updatedSquares[index + 8].piece.pieceType)) {
                    potentialMoves.push(index + 8);
                    MoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves);
                }
            }
            else {
                if (updatedSquares[index + 8].piece.pieceType === '') {
                    potentialMoves.push(index + 8);
                    MoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves);
                }
                else if (isUpperCase(updatedSquares[index + 8].piece.pieceType)) {
                    potentialMoves.push(index + 8);
                    MoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves);
                }
            }
        }
    }

    return -1;
}

function MoveRight(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 1 <= 63) {
            if (updatedSquares[index].position[0] !== 'H') {
                if (isWhite) {
                    if (updatedSquares[index + 1].piece.pieceType === '') {
                        potentialMoves.push(index + 1);
                        MoveRight(squares, index + 1, count + 1, maxDepth, potentialMoves);
                    }
                    else if (!isUpperCase(updatedSquares[index + 1].piece.pieceType)) {
                        potentialMoves.push(index + 1);
                        MoveRight(squares, index + 1, count + 1, maxDepth, potentialMoves);
                    }
                }
                else {
                    if (updatedSquares[index + 1].piece.pieceType === '') {
                        potentialMoves.push(index + 1);
                        MoveRight(squares, index + 1, count + 1, maxDepth, potentialMoves);
                    }
                    else if (isUpperCase(updatedSquares[index + 1].piece.pieceType)) {
                        potentialMoves.push(index + 1);
                        MoveRight(squares, index + 1, count + 1, maxDepth, potentialMoves);
                    }
                }
            }
        }
    }
    return -1;
}

function MoveLeft(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 1 >= 0) {
            if (updatedSquares[index].position[0] !== 'A') {
                if (isWhite) {
                    if (updatedSquares[index - 1].piece.pieceType === '') {
                        potentialMoves.push(index - 1);
                        MoveLeft(squares, index - 1, count + 1, maxDepth, potentialMoves);
                    }
                    else if (!isUpperCase(updatedSquares[index - 1].piece.pieceType)) {
                        potentialMoves.push(index - 1);
                        MoveLeft(squares, index - 1, count + 1, maxDepth, potentialMoves);
                    }
                }
                else {
                    if (updatedSquares[index - 1].piece.pieceType === '') {
                        potentialMoves.push(index - 1);
                        MoveLeft(squares, index - 1, count + 1, maxDepth, potentialMoves);
                    }
                    else if (isUpperCase(updatedSquares[index - 1].piece.pieceType)) {
                        potentialMoves.push(index - 1);
                        MoveLeft(squares, index - 1, count + 1, maxDepth, potentialMoves);
                    }
                }
            }
        }
    }

    return -1;
}

function MoveUpLeft(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 9 >= 0) {
            if (updatedSquares[index].position[0] !== 'A') {
                if (isWhite) {
                    if (updatedSquares[index - 9].piece.pieceType === '') {
                        potentialMoves.push(index - 9);
                        MoveUpLeft(squares, index - 9, count + 1, maxDepth, potentialMoves);
                    }
                    else if (!isUpperCase(updatedSquares[index - 9].piece.pieceType)) {
                        potentialMoves.push(index - 9);
                        MoveUpLeft(squares, index - 9, count + 1, maxDepth, potentialMoves);
                    }
                }
                else {
                    if (updatedSquares[index - 9].piece.pieceType === '') {
                        potentialMoves.push(index - 9);
                        MoveUpLeft(squares, index - 9, count + 1, maxDepth, potentialMoves);
                    }
                    else if (isUpperCase(updatedSquares[index - 9].piece.pieceType)) {
                        potentialMoves.push(index - 9);
                        MoveUpLeft(squares, index - 9, count + 1, maxDepth, potentialMoves);
                    }
                }
            }
        }
    }

    return -1;
}

function MoveDownLeft(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 7 <= 63) {
            if (updatedSquares[index].position[0] !== 'A') {
                if (isWhite) {
                    if (updatedSquares[index + 7].piece.pieceType === '') {
                        potentialMoves.push(index + 7);
                        MoveDownLeft(squares, index + 7, count + 1, maxDepth, potentialMoves);
                    }
                    else if (!isUpperCase(updatedSquares[index + 7].piece.pieceType)) {
                        potentialMoves.push(index + 7);
                        MoveDownLeft(squares, index + 7, count + 1, maxDepth, potentialMoves);
                    }
                }
                else {
                    if (updatedSquares[index + 7].piece.pieceType === '') {
                        potentialMoves.push(index + 7);
                        MoveDownLeft(squares, index + 7, count + 1, maxDepth, potentialMoves);
                    }
                    else if (isUpperCase(updatedSquares[index + 7].piece.pieceType)) {
                        potentialMoves.push(index + 7);
                        MoveDownLeft(squares, index + 7, count + 1, maxDepth, potentialMoves);
                    }
                }
            }
        }
    }

    return -1;
}

function MoveUpRight(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 7 >= 0) {
            if (updatedSquares[index].position[0] !== 'H') {
                if (isWhite) {
                    if (updatedSquares[index - 7].piece.pieceType === '') {
                        potentialMoves.push(index - 7);
                        MoveUpRight(squares, index - 7, count + 1, maxDepth, potentialMoves);
                    }
                    else if (!isUpperCase(updatedSquares[index - 7].piece.pieceType)) {
                        potentialMoves.push(index - 7);
                        MoveUpRight(squares, index - 7, count + 1, maxDepth, potentialMoves);;
                    }
                }
                else {
                    if (updatedSquares[index - 7].piece.pieceType === '') {
                        potentialMoves.push(index - 7);
                        MoveUpRight(squares, index - 7, count + 1, maxDepth, potentialMoves);
                    }
                    else if (isUpperCase(updatedSquares[index - 7].piece.pieceType)) {
                        potentialMoves.push(index - 7);
                        MoveUpRight(squares, index - 7, count + 1, maxDepth, potentialMoves);
                    }
                }
            }
        }
    }

    return -1;
}

function MoveDownRight(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 9 <= 63) {
            if (updatedSquares[index].position[0] !== 'H') {
                if (isWhite) {
                    if (updatedSquares[index + 9].piece.pieceType === '') {
                        potentialMoves.push(index + 9);
                        MoveDownRight(squares, index + 9, count + 1, maxDepth, potentialMoves);
                    }
                    else if (!isUpperCase(updatedSquares[index + 9].piece.pieceType)) {
                        potentialMoves.push(index + 9);
                        MoveDownRight(squares, index + 9, count + 1, maxDepth, potentialMoves);
                    }
                }
                else {
                    if (updatedSquares[index + 9].piece.pieceType === '') {
                        potentialMoves.push(index + 9);
                        MoveDownRight(squares, index + 9, count + 1, maxDepth, potentialMoves);
                    }
                    else if (isUpperCase(updatedSquares[index + 9].piece.pieceType)) {
                        potentialMoves.push(index + 9);
                        MoveDownRight(squares, index + 9, count + 1, maxDepth, potentialMoves);
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
        }
        if (updatedSquares[index].position[0] !== 'H') {
            if (index - 7 >= 0) {
                if (!isUpperCase(updatedSquares[index - 7].piece.pieceType)) {
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
            }
        }
        if (updatedSquares[index].position[0] !== 'H') {
            if (index + 9 <= 63) {
                if (isUpperCase(updatedSquares[index + 9].piece.pieceType) && updatedSquares[index + 9].piece.pieceType !== '') {
                    potentialMoves.push(index + 9);
                }
            }
        }
    }
    return -1;
}

function PawnMoveUp(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index - 8 >= 0) {
            if (isWhite) {
                if (updatedSquares[index - 8].piece.pieceType === '') {
                    potentialMoves.push(index - 8);
                    MoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves);
                }
            }
            else {
                if (updatedSquares[index - 8].piece.pieceType === '') {
                    potentialMoves.push(index - 8);
                    MoveUp(squares, index - 8, count + 1, maxDepth, potentialMoves);
                }
            }
        }

    }
    return -1;
}

function PawnMoveDown(squares, index, count, maxDepth, potentialMoves) {
    const isUpperCase = str => str === str.toUpperCase();
    let isWhite = isUpperCase(squares[index].piece.pieceType)
    let updatedSquares = [...squares];
    if (count < maxDepth) {
        if (index + 8 <= 63) {
            if (isWhite) {
                if (updatedSquares[index + 8].piece.pieceType === '') {
                    potentialMoves.push(index + 8);
                    MoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves);
                }

            }
            else {
                if (updatedSquares[index + 8].piece.pieceType === '') {
                    potentialMoves.push(index + 8);
                    MoveDown(squares, index + 8, count + 1, maxDepth, potentialMoves);
                }

            }
        }
    }

    return -1;
}

export { MoveUp, MoveDown, MoveRight, MoveLeft, MoveUpLeft, MoveDownLeft, MoveUpRight, MoveDownRight, PawnTake, PawnMoveUp, PawnMoveDown, PotentialMoves }