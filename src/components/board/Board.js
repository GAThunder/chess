import React, {useState} from 'react';
import classes from './Board.module.css'
import Square from './square/Square';

function Board(props) {
    const fen = props.fen.split('/');
    const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const yAxis = [8, 7, 6, 5, 4, 3, 2, 1];

    let xSquare = 0;

    const [squares, setSquares] = useState([]);
    console.log(fen);

    // need 2 functions, and an or to pass it depending on if the first condition is true. 
    //The first should select the piece, and highlight valid moves
    //the second should let the player make a valid move, and return a prompt to do so if no valid move is made.
    const selectPiece = (pieceName, position, index) => {
        const color = pieceName.split(' ');
        if(pieceName) {
        console.log(pieceName);
        }
        console.log(position);
        console.log(index);

        if (color[0] === "White")
        {
            console.log(squares[index - 8].position)
        }
        else if (color[0] === "Black")
        {
            console.log(squares[index + 8].position)
        }
        
        console.log(squares[0]);
      }

      // need to map the pieces through the FEN so that they're able to be updated
    for (let y = 0; y < fen.length; y++) {
        for (let x = 0; x < fen[y].length; x++) {

            if (Number(fen[y][x])) {
                for (let i = 0; i < fen[y][x]; i++) {
                    let number = xSquare + y;
                    squares.push({
                        piece: '',
                        number: number,
                        position: xAxis[xSquare] + yAxis[y],
                })
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
                squares.push({
                        piece: fen[y][x],
                        number: number,
                        position: xAxis[xSquare] + yAxis[y],
                })
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
    >{squares.map((square, index) => <Square
    selectPiece={selectPiece}
    index={index}
    piece={square.piece}
    number={square.number}
    key={square.position}
    position={square.position}
    />)}</div>;
}
export default Board;
