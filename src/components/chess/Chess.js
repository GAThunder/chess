import React, { useEffect, useState } from 'react';
import Board from '../board/Board';
import classes from './Chess.module.css';

function Chess() {
  const [fen, setFen] = useState(['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'w', 'KQkq', '-']); // initialize the FEN, and put it an an array, 0 is the positions, 1 is who's turn
  // 2 is who can castle, 3 is if there is an en passent available
  
  const fenPosition = fen[0]; // Take just the part that positions the pieces
  const fenPiecePosition = fenPosition.split('/'); // break it down into an array, row by row for when its set.
  const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; //Set the rows and files for assigning each squares position
  const yAxis = [8, 7, 6, 5, 4, 3, 2, 1];
  let xSquare = 0;
  let startingSquares = []

  const [selectedPiece, setSelectedPiece] = useState(-1); // I'm going to pass two functions down to onClick. The first will be if selectedPiece is -1, and it will set the 
  // index of the piece that is selected. Highlighting that piece, and any valid moves that piece can make.
  const [potentialMoves, setPotentialMoves] = useState([]); //going to fill this with potential moves that can be used in the second part of selectPiece

    for (let y = 0; y < fenPiecePosition.length; y++) { //this sets the initial FEN, and loads it all into a dummy array, before setting the state, so it doesn't load endlessly
      for (let x = 0; x < fenPiecePosition[y].length; x++) {

        if (Number(fenPiecePosition[y][x])) {
          for (let i = 0; i < fenPiecePosition[y][x]; i++) {
            let number = xSquare + y;
            startingSquares.push({
              piece: {
                pieceType: '',
                hasMoved: false,
                isCheck: false,
              },
              number: number,
              position: xAxis[xSquare] + yAxis[y],
              highlighted: false,
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
          startingSquares.push({
            piece: {
              pieceType: fenPiecePosition[y][x],
              hasMoved: false,
              isCheck: false,
            },
            number: number,
            position: xAxis[xSquare] + yAxis[y],
            highlighted: false,
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
  

  
  const [squares, setSquares] = useState([...startingSquares]);
  // need 2 paths in the function, depending on if a piece is selected. 
  //The first should select the piece, and highlight valid moves
  //the second should let the player make a valid move, and return a prompt to do so if no valid move is made.
  const selectPiece = (pieceName, position, index) => {
    let turn = '';
    let newSquares = [...squares]; // make a copy of the board array to update
    if (fen[1] === 'w') {
      turn = "White";
    }
    else {
      turn = "Black";
    }
    const colorPiece = pieceName.split(' '); //colorPiece is an array. 0 is the color, 1 is the piece
    // if (color[0] === "White") {
    //     console.log(squares[index - 8].position)
    // }
    // else if (color[0] === "Black") {
    //     console.log(squares[index + 8].position)
    // }

    if (selectedPiece === -1) {

      if (newSquares[index].piece.pieceType !== '' && turn === colorPiece[0]) { // Make sure to include the index, as colorPiece is an array
        setSelectedPiece(index);
        console.log(selectedPiece);
        newSquares[index].highlighted = !newSquares[index].highlighted;
        setSquares(newSquares);


      }
      else {
        alert("Please select a valid piece");
      }
    }

    else {

    }




    // if(newSquares[0].piece != '') {  --move logic
    // newSquares[0].piece = '';
    // setSquares(newSquares);
    // }
    // else {
    // newSquares[0].piece = 'r';
    // setSquares(newSquares);
    // save any changes to state.

  }

  const updateFEN = (e) => {
    setChangedFEN(e.target.value);
  }

  const submitFEN = () => {
    var newFenArray = fen;
    newFenArray[0] = changedFEN;
    setFen(newFenArray);
    setSquares([...startingSquares]);
    console.log("test");
  }

  const [changedFEN, setChangedFEN] = useState();

  return <div className={classes.Chess}>
    <div className={classes.FEN_display}>
      <span className={classes.Input_Line}><p>Input FEN String:</p><input type="text" value={changedFEN} onChange={updateFEN}></input></span><button onClick={submitFEN}>Update</button>
      <p>Current FEN is: {fen[0]}</p>
    </div>
    <Board
      key={fen}
      squares={squares}
      selectPiece={selectPiece}
    />
  </div>;
}


export default Chess;

