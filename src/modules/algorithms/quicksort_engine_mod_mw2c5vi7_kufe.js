function partition(arr, low, high, comparator) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (comparator(arr[j], pivot) <= 0) {
      i++;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  const swapTemp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = swapTemp;
  return i + 1;
}

function quickSortHelper(arr, low, high, comparator) {
  if (low < high) {
    const pi = partition(arr, low, high, comparator);
    quickSortHelper(arr, low, pi - 1, comparator);
    quickSortHelper(arr, pi + 1, high, comparator);
  }
}

function quickSort(inputArray, comparator = (a, b) => a - b) {
  const arr = [...inputArray];
  quickSortHelper(arr, 0, arr.length - 1, comparator);
  return arr;
}

module.exports = { version: "mod_mw2c5vi7_kufe", quickSort };
