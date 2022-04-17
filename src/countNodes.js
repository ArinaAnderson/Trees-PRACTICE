import {
  getChildren, isFile,
} from '@hexlet/immutable-fs-trees';
import sumOfArrElems from './utils.js';

export const countNodesMap = (node) => {
  if (isFile(node)) {
    return 1;
  }
  const children = getChildren(node);
  const res = children.map(countNodesMap);
  // return 1 + _.sum(res.flat());
  return 1 + sumOfArrElems(res);
};

export const countNodesReduce = (node) => {
  if (isFile(node)) {
    return 1;
  }
  const res = getChildren(node).reduce((acc, elem) => acc + countNodesReduce(elem), 0);
  return 1 + res;
};

export const countNodesAcc = (node) => {
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
