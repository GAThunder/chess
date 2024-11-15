// Sees which square the king is on, and returns the index. 

function LocateKing(squares, isWhite) {
    if (isWhite) {
        for(let i = 0; i < squares.length; i++){
            if (squares[i].piece.pieceType === 'K') {
                return i;
            }
        }
    }
    else {
        for(let i = 0; i < squares.length; i++){
            if (squares[i].piece.pieceType === 'k') {
                return i;
            }
        }
    }
    return -1;
}

export { LocateKing };