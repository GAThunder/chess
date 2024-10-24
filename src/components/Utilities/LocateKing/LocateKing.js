function LocateKing(squares, isWhite) {
    if (isWhite) {
        squares.forEach((square, index) => {
            if (square.piece.piecetype === 'K') {
                return index;
            }
        });
    }
    else {
        squares.forEach((square, index) => {
            if (square.piece.piecetype === 'k') {
                return index;
            }
        });
    }
    return -1;
}

export { LocateKing };