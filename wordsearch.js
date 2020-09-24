const transpose = require('./transpose');

//given an array of strings and a word to find,
//returns true if the word is present in the array either backwards or forwards
const findStringInArray = function(letters, word){
  for (let line of letters) {
    if (line.includes(word)) return true;
    let reversed = line.split("").reverse().join('');
    
    if(reversed.includes(word)) return true;
  }

  return false;
};

//given a 2D array, returns a 1D array of strings along the right to left diagonal
const flattenDiagonal = (letters) => {
  //init new array for strings
  let newArr = [];

  //init coordinates for traversing 2D array
  let row = 0;
  let col = 0;

  //save max coordinate boundaries
  let rowMax = letters.length;
  let colMax = letters[0].length;

  //traverse along row 0, moving down and left for each element in row 0,
  //stop after we hit the top right corner of the array
  while (row < rowMax && col < colMax) {
    if(row === 0 && col === 0) {
      newArr.push(letters[0][0]);
      col += 1;
    } else {
      let newStr = "";
      let newCol = col;
      let newRow = row;
      while (newRow < rowMax && newCol > -1) {
        newStr += letters[newRow][newCol];
        newRow += 1;
        newCol -= 1;
      }
      newArr.push(newStr);
      col += 1;
    }
  }

  //reseting to move top to bottom, on the right edge
  col = letters[0].length - 1;
  row = 1;

  //while the row is still within bounds
  while (row < rowMax) {
    //bottom right corner
    if (row === rowMax -1 && col === colMax - 1) {
      newArr.push(letters[row][col]);
      row += 1;
    } else {
      let newStr = "";
      let newCol = col;
      let newRow = row;
      while (newRow < rowMax && newCol > -1) {
        newStr += letters[newRow][newCol];
        newRow += 1;
        newCol -= 1;
      }
      newArr.push(newStr);
      row += 1;
    }
  }

  return newArr;
}
// RESULT from flatten => ['A' (0,0 - 0,0), 'WS'(0,1 - 1,0), 'CEY'(0,2 - 2,0), 
//                         'FIFH'.... 'SA', "L"];
      //['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
      //['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
      //['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
      //['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
      //['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
      //['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
      //['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
      //['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
      //['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//       
//       
//       
//       
//      
//       
//       
//       
//       
//     ]

// const testMatrix = [['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//       ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//       ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//       ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//       ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//       ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//       ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//       ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//       ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L']];
// console.log(flattenDiagonal(testMatrix));

const wordSearch = (letters, word) => { 
  //flatten 2D array to array of string (horiz)
  const horizontalJoin = letters.map(ls => ls.join(''));
  //flatten 2D array to array of strings (vertically)
  const verticalJoin = transpose(letters).map(ls => ls.join(''));
  const diagonalJoin1 = flattenDiagonal(letters);
  //const diagonalJoin2 = flattenDiagonal(transpose(letters));
  const diagonalJoin2 = flattenDiagonal(letters.reverse());
  //flatten 2D array to array of string (diagnolly);
  const horizontalCheck = findStringInArray(horizontalJoin, word);
  const verticalCheck = findStringInArray(verticalJoin, word);
  const diagonal1Check = findStringInArray(diagonalJoin1, word);
  const diagonal2Check = findStringInArray(diagonalJoin2, word);

  return horizontalCheck || verticalCheck || diagonal1Check || diagonal2Check;
};

module.exports = wordSearch;