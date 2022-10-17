const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */

  function transform(arr) {
    
    if (!Array.isArray(arr)) {
      throw Error(`'arr' parameter must be an instance of the Array!`);
    }
    
    const newArr = arr.reduce((acc, elem) => {
      if(elem === '--discard-prev') {
        acc.pop();
      } else if (elem === '--double-prev') {
        if (acc.length) {
          acc.push(acc.at(-1));
        }
      } else if (elem === '--discard-next') {
        acc.push(elem);
      } else if (elem === '--double-next') {
        acc.push(elem);
      } else if (acc.at(-1) === '--discard-next') {
        acc.pop();
        acc.push('--REMOVE');
      } else if (acc.at(-1) === '--double-next') {
        acc.pop();
        acc.push(elem);
        acc.push(elem);
      }
      else {
        acc.push(elem);
      }
      
      return acc;
    }, []).filter((elem) => {
      const isText = elem === '--double-next'|| elem === '--discard-next' || elem === '--discard-prev' || elem === '--double-prev' || elem === '--REMOVE';
      return !isText;
    });

    return newArr;
  }

module.exports = {
  transform
};
