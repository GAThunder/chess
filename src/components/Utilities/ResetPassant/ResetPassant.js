function ResetPassant(squares, newFenArray) {
    squares.forEach((square) => {
        square.piece.potentialPassant = false; 
    })
    
    newFenArray[3] = '-';
}

export {ResetPassant}