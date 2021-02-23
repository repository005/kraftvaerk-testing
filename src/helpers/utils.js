export const sortArrayByValue = (arr, type, valueName) => {
  let sortedArray;
  switch (type) {
    case 'string':
      sortedArray = arr.sort((a, b) => compareString(a, b, valueName));
      break;

    default:
      sortedArray = arr;
  }
  return sortedArray;
}

function compareString(a, b, valueName) {

  const first = a[valueName].toLowerCase();
  const second = b[valueName].toLowerCase();

  if (first > second) {
    return 1;
  }
  if (first < second) {
    return -1;
  }
  return 0;
  
}