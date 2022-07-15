import React, { useState, useEffect } from 'react';
import classes from './Board.module.css'
import Square from './square/Square';

function Board(props) {
    return <div className={classes.Board}
            key={props.FEN}>   
        {props.squares.map((square, index) => <Square
        selectPiece={props.selectPiece}
        index={index}
        piece={square.piece.pieceType}
        number={square.number}
        key={square.position}
        position={square.position}
        highlighted={square.highlighted}
    />)}
            </div>;
}
export default Board;
