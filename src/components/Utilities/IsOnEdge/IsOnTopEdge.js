function IsOnTopEdge(squares, index) {
    if (squares[index].position[1] !== '8')
    {
        return false;
    }
    else
    {
        return true;
    }
}

export  {IsOnTopEdge}