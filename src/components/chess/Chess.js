import React, {useState} from 'react';
import Board from '../board/Board';
import classes from './Chess.module.css';

function Chess() {
    const [fen, setFen] = useState(['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR','w','KQkq','-']); // initialize the FEN, and put it an an array, 0 is the positions, 1 is who's turn
    // 2 is who can castle, 3 is if there is an en passent available
    const [board, setBoard] = useState(''); //create the board state, will need to fill based on the current FEN

    const [fenPosition, setFenPosition] =useState(fen[0]);


  return <div className={classes.Chess}>
        <Board 
        fen = {fenPosition}/>
        </div>;
}

export default Chess;

