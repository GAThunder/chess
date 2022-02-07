import classes from './Board.module.css'
import Square from './square/Square';

function Board(props) {
    const fen = props.fen.split('/');
    const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const yAxis = [8, 7, 6, 5, 4, 3, 2, 1];

    let xSquare = 0;

    const squares = [];
    console.log(fen);

    const selectPiece = (pieceName, position, index) => {
        const color = pieceName.split(' ');
        if(pieceName) {
        console.log(pieceName);
        }
        console.log(position);
        console.log(index);
        if (color[0] === "White")
        {
            console.log(squares[index - 8].props.position)
        }
        else if (color[0] === "Black")
        {
            console.log(squares[index + 8].props.position)
        }
      }

    for (let y = 0; y < fen.length; y++) {
        for (let x = 0; x < fen[y].length; x++) {
            

            if (Number(fen[y][x])) {
                for (let i = 0; i < fen[y][x]; i++) {
                    let number = xSquare + y;
                    squares.push(<Square
                        selectPiece={selectPiece}
                        index={squares.length}
                        piece={''}
                        number={number}
                        key={xAxis[xSquare] + yAxis[y]}
                        position={xAxis[xSquare] + yAxis[y]}
                    />)
                    if (xSquare != 7) {
                    xSquare++;
                    }
                    else {
                        xSquare = 0;
                    }
                }
            }
            else {
                let number = xSquare + y;
                squares.push(<Square
                    selectPiece={selectPiece}
                    index={squares.length}
                    piece={fen[y][x]}
                    number={number}
                    key={xAxis[xSquare] + yAxis[y]}
                    position={xAxis[xSquare] + yAxis[y]}
                />)
                if (xSquare != 7) {
                    xSquare++;
                    }
                    else {
                        xSquare = 0;
                    }
                }
            }
        }

    


    return <div
    className={classes.Board}
    >{squares}</div>;
}
export default Board;
