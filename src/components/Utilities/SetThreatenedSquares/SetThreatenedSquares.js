function SetThreatenedSquares(squares, threatenedArray) {
    for (let i = 0; i < threatenedArray.length; i++) {
        squares[threatenedArray[i]].piece.isCheck = true;
    }
}

export {SetThreatenedSquares}