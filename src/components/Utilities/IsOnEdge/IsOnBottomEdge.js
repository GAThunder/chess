function IsOnBottomEdge(squares, index) {
    if (squares[index].position[1] !== '1')
    {
        return false;
    }
    else
    {
        return true;
    }
}

export  {IsOnBottomEdge}