import _ from 'lodash';
import {
  getChildren, getName, getMeta, isFile,
} from '@hexlet/immutable-fs-trees';
import sumOfArrElems from './utils.js';

/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход директорию
и возвращает список вложенных узлов (директорий и файлов) в указанную директорию на один уровень,
а так же место, которое они занимают. Размер файла задается в метаданных.
Размер директории складывается из сумм всех размеров файлов, находящихся
внутри во всех поддиректориях.
Сами директории размера не имеют.
*/

export const getDirSpaceReduce = (node) => {
  if (isFile(node)) {
    return _.has(getMeta(node), 'size') ? getMeta(node).size : 0;
  }
  const children = getChildren(node);
  const dirSpace = children.reduce((acc, el) => acc + getDirSpaceReduce(el), 0);
  return dirSpace;
};

export const getDirSpaceMap = (node) => {
  if (isFile(node)) {
    return _.has(getMeta(node), 'size') ? getMeta(node).size : 0;
  }
  const children = getChildren(node);
  const dirSpace = children.map(getDirSpaceMap);
  return sumOfArrElems(dirSpace);
};

export const du = (node) => {
  const firstLvlNodes = getChildren(node);
  const result = firstLvlNodes.map((el) => [getName(el), getDirSpaceMap(el)]);
  // return result.sort((a, b) => b[1] - a[1]);
  return result.sort(([, size1], [, size2]) => size2 - size1);
};

/*
// Teacher's solution:
const calculatefilesSize = (tree) => {
  if (isFile(tree)) {
    const meta = getMeta(tree);
    return meta.size;
  }

  const children = getChildren(tree);
  const sizes = children.map(calculatefilesSize);
  return _.sum(sizes);
};

const du = (tree) => {
  const children = getChildren(tree);
  const result = children.map((child) => [getName(child), calculatefilesSize(child)]);
  // Destructuring
  result.sort(([, size1], [, size2]) => size2 - size1);
  return result;
};
*/
