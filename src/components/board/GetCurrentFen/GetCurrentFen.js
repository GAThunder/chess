function GetCurrentFen(squares) {
    let count = 0;
    let blankSpaces = 0;
    let newFen = '';
    for (let i = 0; i < 64; i++) {
        if (count === 8) {
            if(blankSpaces > 0)
            {
                newFen += blankSpaces;
                blankSpaces = 0;
            }
            newFen += '/';
            count = 0;
        }
       if (squares[i].piece.pieceType === '')
       {
        blankSpaces++;
        count++;
       }
       if (squares[i].piece.pieceType !== '') {
        if (blankSpaces > 0){
            newFen += blankSpaces;
            blankSpaces = 0;
        }
        newFen += squares[i].piece.pieceType;
        count++;
       }
    }

    return newFen;
}

export default GetCurrentFen;