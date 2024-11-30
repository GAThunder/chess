import Piece from "../../board/piece/Piece";

function ResetBoard(startingSquares) {
    const initialFen = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'w', 'KQ', 'kq', '-']; 
    const initialFenPositions = initialFen[0]; // Take just the part that positions the pieces
    const initialFenPiecePosition = initialFenPositions.split('/'); // break it down into an array, row by row for when its set.
    const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; //Set the rows and files for assigning each squares position
    const yAxis = [8, 7, 6, 5, 4, 3, 2, 1];

    let xSquare = 0;
    for (let y = 0; y < initialFenPiecePosition.length; y++) { //this sets the initial FEN, and loads it all into a dummy array, before setting the state, so it doesn't load endlessly
        for (let x = 0; x < initialFenPiecePosition[y].length; x++) {

            if (Number(initialFenPiecePosition[y][x])) {
                for (let i = 0; i < initialFenPiecePosition[y][x]; i++) {
                    let number = xSquare + y;
                    const piece = new Piece('')
                    startingSquares.push({
                        piece,
                        number: number,
                        position: xAxis[xSquare] + yAxis[y],
                        highlighted: false,
                    })
                    if (xSquare !== 7) {
                        xSquare++;
                    }
                    else {
                        xSquare = 0;
                    }
                }
            }
            else {
                let number = xSquare + y;
                const piece = new Piece(initialFenPiecePosition[y][x])
                startingSquares.push({
                    piece,
                    number: number,
                    position: xAxis[xSquare] + yAxis[y],
                    highlighted: false,
                })
                if (xSquare !== 7) {
                    xSquare++;
                }
                else {
                    xSquare = 0;
                }
            }
        }
    }
}

export {ResetBoard};