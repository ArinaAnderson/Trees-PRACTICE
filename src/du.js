import _ from 'lodash';
import {
  mkdir, mkfile, getChildren, getName, getMeta, isFile,
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

/*
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
*/

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 500 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 300 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 350 }),
  mkfile('resolve', { size: 100 }),
]);

// du(tree);
// [
//   ['etc', 10280],
//   ['hosts', 3500],
//   ['resolve', 1000],
// ]

const calcNodeSize = (node) => {
  if (isFile(node)) {
    return _.has(getMeta(node), 'size') ? getMeta(node).size : 0;
  }
  const children = getChildren(node);
  const sizes = children.map(calcNodeSize);
  return sumOfArrElems(sizes);
};

const du = (node) => {
  const children = getChildren(node);
  const res = children.map((el) => ([getName(el), calcNodeSize(el)]));
  // return res.sort((a, b) => b[1] - a[1]);
  return res.sort(([, size1], [, size2]) => size2 - size1);
};

console.log(du(tree));

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
