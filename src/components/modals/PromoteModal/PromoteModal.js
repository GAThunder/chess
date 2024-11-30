import React from "react";
import { createPortal } from "react-dom";
import classes from "./PromoteModal.module.css"
import blackKnight from '../../../images/black_knight.png';
import blackBishop from '../../../images/black_bishop.png';
import blackRook from '../../../images/black_rook.png';
import blackQueen from '../../../images/black_queen.png';
import whiteKnight from '../../../images/white_knight.png';
import whiteBishop from '../../../images/white_bishop.png';
import whiteRook from '../../../images/white_rook.png';
import whiteQueen from '../../../images/white_queen.png';

function PromoteModal(props) {
    let bishop;
    let knight;
    let rook;
    let queen;

    let bishopPiece;
    let knightPiece;
    let rookPiece;
    let queenPiece;

    if (props.promoteWhite === 'b') {
        bishop = whiteBishop;
        knight = whiteKnight;
        rook = whiteRook;
        queen = whiteQueen;
        bishopPiece = 'B';
        knightPiece = 'N';
        rookPiece = 'R';
        queenPiece = 'Q';
    }
    else {
        bishop = blackBishop;
        knight = blackKnight
        rook = blackRook;
        queen = blackQueen;
        bishopPiece = 'b';
        knightPiece = 'n';
        rookPiece = 'r';
        queenPiece = 'q';
    }

    if (props.disablePromoteModal) {
        return null;
    }

    return createPortal(
        <div className={classes.PromoteModal} >
            <p>Promote your pawn</p>
            <div className={classes.Buttons} >
                <div className={classes.ImageWithText}>
                    <img src={bishop} alt={"bishop_img"} number={1} onClick={() => props.promotePiece(props.squares, bishopPiece, props.promotionIndex)} />
                    <p>Bishop</p>
                </div>
                <div className={classes.ImageWithText}>
                    <img src={knight} alt={"knight_img"} number={2} onClick={() => props.promotePiece(props.squares, knightPiece, props.promotionIndex)} />
                    <p>Knight</p>
                </div>
                <div className={classes.ImageWithText}>
                    <img src={rook} alt={"rook_img"} number={3} onClick={() => props.promotePiece(props.squares, rookPiece, props.promotionIndex)} />
                    <p>Rook</p>
                </div>
                <div className={classes.ImageWithText}>
                    <img src={queen} alt={"queen_img"} number={4} onClick={() => props.promotePiece(props.squares, queenPiece, props.promotionIndex)} />
                    <p>Queen</p>
                </div>
            </div>
        </div>,
        document.getElementById('root'),
    );
}

export { PromoteModal }