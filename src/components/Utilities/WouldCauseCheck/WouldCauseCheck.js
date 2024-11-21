import { LocateKing } from "../LocateKing/LocateKing";
import { IsWhite } from "../IsWhite/IsWhite";
import { OpponentThreatens } from "../OpponentThreatens/OpponenetThreatens";

/*This is supposed to get an array containing all the squares the other player is threatening, and see if after making a mock move, 
if that move is valid, or if it would put the king in check */

function WouldCauseCheck(squares, newFenArray, originalPieceWhite) {
    let opponentPotentialMoves = [];
    if (originalPieceWhite) {
        var kingIndex = LocateKing(squares, true)
    }
    else {
        var kingIndex = LocateKing(squares, false)
    }

    OpponentThreatens(squares, newFenArray, originalPieceWhite, opponentPotentialMoves);

    if (opponentPotentialMoves.includes(kingIndex)) {
        return true;
    }
    else {
        return false;
    }
}

export { WouldCauseCheck };