
/// Transpose built in pair programming W2D2
/// by Chantal, Graeme, and Scott
const transpose = function(matrix) {
  let newArr = [] // empty array. hold all new rows

  //initialize rows in the array, as many as there are columns in the original matrix
  for (let i = 0; i < matrix[0].length; i++) {
    newArr.push([]);
  }

  //iterate through each row in the original array
  for (let r = 0; r < matrix.length; r++) {
    //iterating through each column of the current row in the original array    
    for(let c = 0; c < matrix[r].length; c++){
      //the index of the column in the original matrix matches the row of the new array
      newArr[c].push(matrix[r][c]);
    }

  }

  return newArr;
};



module.exports = transpose;