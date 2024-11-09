function IsOnRightEdge(squares, index) {
    if (squares[index].position[0] !== 'H')
    {
        return false;
    }
    else
    {
        return true;
    }
}

export  {IsOnRightEdge}