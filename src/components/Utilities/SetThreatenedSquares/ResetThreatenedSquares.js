function ResetThreatenedSquares(squares) {
    squares.forEach(element => {
        element.piece.isCheck = false;
    });
}

export {ResetThreatenedSquares}