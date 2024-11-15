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
}

export default Piece;