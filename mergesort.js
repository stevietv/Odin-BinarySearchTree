export function mergeSort(arr) {
  // Base Case: when array is only single a number then return that array
  if (arr.length <= 1)
    return arr;

  // Recursive Case: split the array in two and recurse each side

  let middle = arr.length/2;

  let leftArr = mergeSort(arr.slice(0, middle));
  let rightArr = mergeSort(arr.slice(middle));

  // sort the array by comparing the first items of each list and pushing to a new one

  let sortedArr = [];

  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0])
      sortedArr.push(leftArr.shift());
    else
      sortedArr.push(rightArr.shift());
  }

  // ensure we pick up any leftovers in left array and right array by spreading them
  return[...sortedArr, ...leftArr, ...rightArr];
}