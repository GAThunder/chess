import React, { useEffect, useState } from 'react';
import Board from '../board/Board';
import classes from './Chess.module.css';
import Piece from '../board/piece/Piece.js';
import GetCurrentFen from '../board/GetCurrentFen/GetCurrentFen';
import { PotentialMoves, MovePiece, PotentialEnPassant } from '../board/piece/moves/Moves.js';
import { HighlightPieces, UnHighlightPieces } from '../Utilities/HighlightPieces/HighlightPieces.js';
import { UpdateTurn } from '../Utilities/UpdateTurn/UpdateTurn.js';
import { ResetPassant } from '../Utilities/ResetPassant/ResetPassant.js';

function Chess() {
  const [fen, setFen] = useState(['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'w', 'KQ','kq', '-']); // initialize the FEN, and put it an an array, 0 is the positions, 1 is who's turn
  // 2 is who can castle, 3 is if there is an en passent available

  const fenPosition = fen[0]; // Take just the part that positions the pieces
  const fenPiecePosition = fenPosition.split('/'); // break it down into an array, row by row for when its set.
  const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; //Set the rows and files for assigning each squares position
  const yAxis = [8, 7, 6, 5, 4, 3, 2, 1];
  let xSquare = 0;
  let startingSquares = []

  const [selectedPiece, setSelectedPiece] = useState(-1); // I'm going to pass two functions down to onClick. The first will be if selectedPiece is -1, and it will set the 
  // index of the piece that is selected. Highlighting that piece, and any valid moves that piece can make.

  for (let y = 0; y < fenPiecePosition.length; y++) { //this sets the initial FEN, and loads it all into a dummy array, before setting the state, so it doesn't load endlessly
    for (let x = 0; x < fenPiecePosition[y].length; x++) {

      if (Number(fenPiecePosition[y][x])) {
        for (let i = 0; i < fenPiecePosition[y][x]; i++) {
          let number = xSquare + y;
          const piece = new Piece('')
          startingSquares.push({
            piece,
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
        const piece = new Piece(fenPiecePosition[y][x])
        startingSquares.push({
          piece,
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
  //The first should select the piece, and highlight valid moves, if not a valid piece, alert the player
  //the second should let the player make a valid move, and return a prompt to do so if no valid move is made, or select another valid piece.
  const selectPiece = (pieceName, index) => {
    let turn = '';
    let newSquares = [...squares]; // make a copy of the board array to update
    if (fen[1] === 'w') {
      turn = "White";
    }
    else {
      turn = "Black";
    }
    console.log(index);
    const colorPiece = pieceName.split(' '); //colorPiece is an array. 0 is the color, 1 is the piece
    let potentialMoves = [];
    if (selectedPiece === -1) {

      if (newSquares[index].piece.pieceType !== '' && turn === colorPiece[0]) { // Make sure to include the index, as colorPiece is an array
        //Sets selected piece and highlights potential moves
        setSelectedPiece(index);
        newSquares[index].highlighted = true;
        potentialMoves = PotentialMoves(newSquares, index,);
        HighlightPieces(potentialMoves, newSquares);
        setSquares(newSquares);
      }
      else {
        alert("Please select a valid piece");
      }
    }

    else if (selectedPiece !== -1) {
      // executes a valid move as long as its not the piece already selected
      if (newSquares[index].highlighted === true && index !== selectedPiece) {
        let newFenArray = fen;
        UnHighlightPieces(newSquares);
        MovePiece(newSquares, index, selectedPiece, newFenArray);
        setSquares(newSquares);
        setSelectedPiece(-1);
        newFenArray[0] = GetCurrentFen(newSquares);
        UpdateTurn(newFenArray);
        setFen(newFenArray);
      }

      else if (turn == colorPiece[0]) {
        //changes the selected piece to a different selected piece
        UnHighlightPieces(newSquares);
        potentialMoves = PotentialMoves(newSquares, index);
        HighlightPieces(potentialMoves, newSquares);
        setSelectedPiece(index);
        newSquares[index].highlighted = true;
        setSquares(newSquares);
      }

      else {
        alert("Please select a valid piece");
      }
    }
    console.log(newSquares[index]);
  }

  const updateFEN = (e) => {
    setChangedFEN(e.target.value);
  }

  const submitFEN = () => { // maybe use effect to stop double load
    let newFenArray = fen;
    newFenArray[0] = changedFEN;
    setFen(newFenArray);
    let updatedSquares = [...startingSquares]
    setSquares(updatedSquares);
  }

  const [changedFEN, setChangedFEN] = useState();

  return <div className={classes.Chess}>
    <div className={classes.FEN_display}>
      <span className={classes.Input_Line}><p>Input FEN String:</p><input type="text" value={changedFEN} onChange={updateFEN}></input></span><button onClick={submitFEN}>Update</button>
      <p>Current FEN is: {fen[0]} {fen[1]} {fen[2]}{fen[3]} {fen[4]}</p>
    </div>
    <Board
      key={fen}
      squares={squares}
      selectPiece={selectPiece}
    />
  </div>;
}


export default Chess;

