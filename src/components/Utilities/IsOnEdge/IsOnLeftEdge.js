function IsOnLeftEdge(squares, index) {
    if (squares[index].position[0] !== 'A')
    {
        return false;
    }
    else
    {
        return true;
    }
}

export {IsOnLeftEdge}