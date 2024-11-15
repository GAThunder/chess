import cloneDeep from 'lodash/cloneDeep'

/* Need a way to make a deep copy of the map. When its a shallow copy, it makes changes on the original as well. 
It also needs to make sure that it copies the class, and doesn't just send it as a standard object. */


function CopyBoard(arr) {
   return cloneDeep(arr);
}

export { CopyBoard }