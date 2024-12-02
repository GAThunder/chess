import {IsWhite} from '../IsWhite/IsWhite.js'

function CurrentPoints(squares) {
    let points = 0;
    squares.forEach(square => {
        if(IsWhite(square.piece.pieceType)) {
            points = points + square.piece.piecePoints();
        }
        else {
            points = points - square.piece.piecePoints();
        }
    });
    return points;

}

export {CurrentPoints}