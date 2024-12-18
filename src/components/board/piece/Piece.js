import { PotentialMoves } from "./moves/Moves";

/*TODO need to make it a proper class, make getters and setters and set its properties to private */

class Piece {
    constructor(pieceType) {
        this.pieceType = pieceType;
        this.hasMoved = false;
        this.isCheck = false;
        this.potentialPassant = false;
    }
    pieceMoves(squares, index, newFenArray) {
        return PotentialMoves(squares, index, newFenArray, false);
    }
    pieceThreatens(squares, index, newFenArray) {
        return PotentialMoves(squares, index, newFenArray, true);
    }
    piecePoints() {
        switch (this.pieceType) {
            case 'k':
            case 'K':
                return 100000;
            case 'q':
            case 'Q':
                return 9;
            case 'n':
            case 'N':
                return 3;
            case 'b':
            case 'B':
                return 3;
            case 'r':
            case 'R':
                return 5;
            case 'p':
            case 'P':
                return 1;
            default :
            return 0;
        }
    }
}

export default Piece;