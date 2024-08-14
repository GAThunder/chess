function HighlightPieces (potentialMoves, newSquares) {
    potentialMoves.forEach((index) => {
        newSquares[index].highlighted = true;
      })
}

function UnHighlightPieces (newSquares) {
    newSquares.forEach((square) => {
        square.highlighted = false; 
    })
}

export {HighlightPieces, UnHighlightPieces}