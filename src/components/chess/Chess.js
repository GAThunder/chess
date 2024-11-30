import React, {useState } from 'react';
import Board from '../board/Board';
import classes from './Chess.module.css';
import GetCurrentFen from '../board/GetCurrentFen/GetCurrentFen';
import { PotentialMoves, MovePiece, } from '../board/piece/moves/Moves.js';
import { HighlightPieces, UnHighlightPieces } from '../Utilities/HighlightPieces/HighlightPieces.js';
import { UpdateTurn } from '../Utilities/UpdateTurn/UpdateTurn.js';
import { CopyBoard } from '../Utilities/CopyBoard/CopyBoard.js';
import { AnyPotentialMoves } from '../Utilities/AnyPotentialMoves/AnyPotentialMoves.js';
import { PromoteModal } from '../modals/PromoteModal/PromoteModal.js';
import { CheckPromotion } from '../Utilities/CheckPromotion/CheckPromotion.js';
import { GameOverModal } from '../modals/GameOverModal/GameOverModal.js';
import { ResetBoard } from '../Utilities/ResetBoard/ResetBoard.js';


function Chess() {
  const initialFen = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'w', 'KQ','kq', '-']
  const [fen, setFen] = useState(initialFen); // initialize the FEN, and put it an an array, 0 is the positions, 1 is who's turn
  // 2 is who can castle, 3 is if there is an en passent available

  let startingSquares = []

  const [disablePromoteModal, setDisablePromoteModal] = useState(true);
  const [disableGameOverModal, setDisableGameOverModal] = useState(true);
  
  const [promotionIndex, setPromotionIndex] = useState(-1);

  const [selectedPiece, setSelectedPiece] = useState(-1); // I'm going to pass two functions down to onClick. The first will be if selectedPiece is -1, and it will set the 
  // index of the piece that is selected. Highlighting that piece, and any valid moves that piece can make.
  ResetBoard(startingSquares);

  const resetGame = () => {
    setSquares(startingSquares);
    setFen(initialFen);
    setDisableGameOverModal(true);
  }
  const [squares, setSquares] = useState([...startingSquares]);
  // need 2 paths in the function, depending on if a piece is selected. 
  //The first should select the piece, and highlight valid moves, if not a valid piece, alert the player
  //the second should let the player make a valid move, and return a prompt to do so if no valid move is made, or select another valid piece.
  const selectPiece = (pieceName, index) => {
    let turn = '';
    let newSquares = CopyBoard(squares); // make a copy of the board array to update
    if (fen[1] === 'w') {
      turn = "White";
    }
    else {
      turn = "Black";
    }
    var blackMoves = [];
    var whiteMoves = [];
  
    const colorPiece = pieceName.split(' '); //colorPiece is an array. 0 is the color, 1 is the piece
    let potentialMoves = [];
    if (selectedPiece === -1) {

      if (newSquares[index].piece.pieceType !== '' && turn === colorPiece[0]) { // Make sure to include the index, as colorPiece is an array
        //Sets selected piece and highlights potential moves
        let newFenArray = fen;
        setSelectedPiece(index);
        newSquares[index].highlighted = true;
        potentialMoves = newSquares[index].piece.pieceMoves(newSquares, index, newFenArray);
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
        /*After move piece, see if pawn can be promotion, then after promotion check for game over.
        TODO: should all this be in the move function itself? With the modal being ASYNC I want to make sure
        everything is in order.
        
        */
        if(CheckPromotion(newSquares, fen[1]) !== -1) {
          setPromotionIndex(CheckPromotion(newSquares, fen[1]));
          setDisablePromoteModal(false);
        }
        
        AnyPotentialMoves(newSquares, newFenArray, true, whiteMoves);
        AnyPotentialMoves(newSquares, newFenArray, false, blackMoves);
        if (turn === "White" && blackMoves.length === 0) {
          setDisableGameOverModal(false);
        }
        else if (turn === "Black" && whiteMoves.length === 0) {
          setDisableGameOverModal(false);
        }
        setSquares(newSquares);
        setSelectedPiece(-1);
        newFenArray[0] = GetCurrentFen(newSquares);
        UpdateTurn(newFenArray);
        setFen(newFenArray);
      }

      else if (turn === colorPiece[0]) {
        //changes the selected piece to a different selected piece
        let newFenArray = fen;
        UnHighlightPieces(newSquares);
        potentialMoves = PotentialMoves(newSquares, index, newFenArray);
        HighlightPieces(potentialMoves, newSquares);
        setSelectedPiece(index);
        newSquares[index].highlighted = true;
        setSquares(newSquares);
      }

      else {
        alert("Please select a valid piece");
      }
    }
    
  }
  //TODO fully set up promote piece function
  const promotePiece = (squares, promotedToPiece, promotionIndex) => {
      squares[promotionIndex].piece.pieceType = promotedToPiece;
      setSquares(squares);
      setDisablePromoteModal(true);
      setPromotionIndex(-1);
  }

  return <div className={classes.Chess}>
    <div className={classes.FEN_display}>
      <p>Current FEN is: {fen[0]} {fen[1]} {fen[2]}{fen[3]} {fen[4]}</p>
    </div>
    <Board
      key={fen}
      squares={squares}
      selectPiece={selectPiece}
    />
    <PromoteModal 
      disablePromoteModal={disablePromoteModal}
      promoteWhite={fen[1]}
      promotePiece={promotePiece}
      promotionIndex = {promotionIndex}
      squares={squares}
    />
    <GameOverModal
    disableGameOverModal={disableGameOverModal}
    resetGame={resetGame}
    />
  </div>;
}


export default Chess;

