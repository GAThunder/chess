function UpdateTurn(newFenArray) {
    if (newFenArray[1] === 'w') {
        newFenArray[1] = 'b';
      }
      else {
        newFenArray[1] ='w';
      }
}

export {UpdateTurn}