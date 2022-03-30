const sumOfArrElems = (arr) => {
  const iter = (acc, idx) => {
    if (idx === arr.length) {
      return acc;
    }
    if (!Array.isArray(arr[idx])) {
      return iter(acc + arr[idx], idx + 1);// iter(14, 2)
    }
    return iter(acc + sumOfArrElems(arr[idx]), idx + 1);
  };
  return iter(0, 0);
};

export default sumOfArrElems;
