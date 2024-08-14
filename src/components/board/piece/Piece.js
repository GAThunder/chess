function Piece(pieceType) {
    this.pieceType = pieceType;
    this.hasMoved = false;
    this.isCheck = false;
    this.potentialPassant = false;
}

export default Piece;