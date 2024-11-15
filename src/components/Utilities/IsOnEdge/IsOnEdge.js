import { IsOnBottomEdge } from "./IsOnBottomEdge";
import { IsOnLeftEdge } from "./IsOnLeftEdge";
import { IsOnRightEdge } from "./IsOnRightEdge";
import { IsOnTopEdge } from "./IsOnTopEdge";

/*The move function was checking each index, which was fine checking each individual spot to see if the piece can move there
But it wasn't working to see if the original piece was able to move there without putting the piece in check. 


We're going to assume its a valid move, and check if we're up against each edge and moving in that direction, if we are, the move is no longer valid.

*/


function IsOnEdge(squares, index, direction, moveDown, moveLeft, moveRight, moveUp) {
    const up = -8;
    const down = 8;
    const left = -1;
    const right = 1;
    const upLeft = -9;
    const upRight = -7;
    const downLeft = 7;
    const downRight = 9;

    var isValidMove = true;

    if (direction === right || direction === upRight || direction === downRight) {
        moveRight = true;
    }

    if (direction === left || direction === upLeft || direction === downLeft) {
        moveLeft = true;
    }

    if (direction === up || direction === upRight || direction === upLeft) {
        moveUp = true;
    }

    if (direction === down || direction === downRight || direction === downLeft) {
        moveDown = true;
    }

    if (moveRight && IsOnRightEdge(squares, index)) {
        isValidMove = false;
    }

    if (moveLeft && IsOnLeftEdge(squares, index)) {
        isValidMove = false;
    }

    if (moveUp && IsOnTopEdge(squares, index)) {
        isValidMove = false;
    }

    if (moveDown && IsOnBottomEdge(squares, index)) {
        isValidMove = false;
    }


    return isValidMove;
}

export { IsOnEdge }