function ResetPassant(squares, newFenArray) {
    if (newFenArray[4] !== '-') {
        squares.forEach((square) => {
            square.piece.potentialPassant = false;
        })
    }
    newFenArray[4] = '-';
}

export { ResetPassant }