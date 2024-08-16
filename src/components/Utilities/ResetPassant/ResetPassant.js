function ResetPassant(squares, newFenArray) {
    if (newFenArray[3] !== '-') {
        squares.forEach((square) => {
            square.piece.potentialPassant = false;
        })
    }
    newFenArray[3] = '-';
}

export { ResetPassant }