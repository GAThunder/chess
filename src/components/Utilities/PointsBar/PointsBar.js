import { IsWhite } from '../IsWhite/IsWhite.js'

function PointsBar(squares) {
    let totalPoints = 0;
    let whitePoints = 0;
    let blackPoints = 0;
    squares.forEach(square => {
        if (IsWhite(square.piece.pieceType) && square.piece.pieceType !== 'K') {
            whitePoints = whitePoints + square.piece.piecePoints();
        }
        else if (!IsWhite(square.piece.pieceType) && square.piece.pieceType !== 'k') {
            blackPoints = blackPoints + square.piece.piecePoints();
        }
    });

    totalPoints = whitePoints + blackPoints;

    if (totalPoints === 0) {
        return 50;
    }

    return ((whitePoints / totalPoints) * 100);

}

export { PointsBar }