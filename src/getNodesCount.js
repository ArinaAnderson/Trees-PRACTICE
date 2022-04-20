import {
  getChildren, isFile,
} from '@hexlet/immutable-fs-trees';
import sumOfArrElems from './utils.js';

export const getNodesCountReduce = (node) => {
  if (isFile(node)) {
    return 1;
  }
  const res = getChildren(node).reduce((acc, el) => acc + getNodesCountReduce(el), 0);
  return 1 + res;
};

export const getNodesCountMap = (node) => {
  if (isFile(node)) {
    return 1;
  }
  const res = getChildren(node).map(getNodesCountMap);
  // return 1 + _.sum(res.flat());
  return 1 + sumOfArrElems(res);
};

export const getNodesCountAcc = (node) => {
  let count = 0;
  const iter = (elem) => {
    count += 1;
    if (isFile(elem)) {
      return;
    }
    const children = getChildren(elem);
    children.forEach(iter);
  };
  iter(node);
  return count;
};

export const getNodesCountAcc2 = (node) => {
  if (isFile(node)) {
    return 1;
  }
  const children = getChildren(node);
  const iter = (acc, idx) => {
    if (idx === children.length) {
      return acc;
    }
    const newAcc = acc + getNodesCountAcc2(children[idx]);
    return iter(newAcc, idx + 1);
  };
  return iter(0, 0) + 1;
};
