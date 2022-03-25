import { useEffect, useState } from 'react';
import classes from './Square.module.css';
import blackPawn from '../../../images/black_pawn.png'
import blackKnight from '../../../images/black_knight.png';
import blackBishop from '../../../images/black_bishop.png';
import blackRook from '../../../images/black_rook.png';
import blackQueen from '../../../images/black_queen.png';
import blackKing from '../../../images/black_king.png';
import whitePawn from '../../../images/white_pawn.png';
import whiteKnight from '../../../images/white_knight.png';
import whiteBishop from '../../../images/white_bishop.png';
import whiteRook from '../../../images/white_rook.png';
import whiteQueen from '../../../images/white_queen.png';
import whiteKing from '../../../images/white_king.png';

function Square(props) {

  const [pieceURL, setPieceURL] = useState('');
  const [pieceName, setPieceName] = useState('');

 useEffect(()=> {  //if I don't useEffect here, it sets the state, which updates the component, which tries to setState again, making an endless loop.
  switch (props.piece) {
    case 'p' :
      setPieceURL(blackPawn);
      setPieceName('Black Pawn');
      break; 

      case 'n' :
      setPieceURL(blackKnight);
      setPieceName('Black Knight');
      break; 

      case 'b' :
      setPieceURL(blackBishop);
      setPieceName('Black Bishop');
      break; 

      case 'r' :
      setPieceURL(blackRook);
      setPieceName('Black Rook');
      break; 

      case 'q' :
      setPieceURL(blackQueen);
      setPieceName('Black Queen');
      break; 

      case 'k' :
      setPieceURL(blackKing);
      setPieceName('Black King');
      break; 

      case 'P' :
      setPieceURL(whitePawn);
      setPieceName('White Pawn');
      break; 

      case 'N' :
      setPieceURL(whiteKnight);
      setPieceName('White Knight');
      break; 

      case 'B' :
      setPieceURL(whiteBishop);
      setPieceName('White Bishop');
      break; 

      case 'R' :
      setPieceURL(whiteRook);
      setPieceName('White Rook');
      break; 

      case 'Q' :
      setPieceURL(whiteQueen);
      setPieceName('White Queen');
      break; 

      case 'K' :
      setPieceURL(whiteKing);
      setPieceName('White King');
      break; 

      default :
      break;
  }
 }, [props.piece]) 
     
  return <div key={props.piece}
  onClick={() => props.selectPiece(pieceName, props.position, props.index)}
  className={(props.number % 2 === 0) ? classes.white : classes.black}
        >
          {props.piece != '' && <img src={pieceURL} alt={pieceName} number={props.number}/>}
        </div>;
}

export default Square;
