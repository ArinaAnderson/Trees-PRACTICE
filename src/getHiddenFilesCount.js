import {
  mkdir, mkfile, getChildren, getName, isFile,
} from '@hexlet/immutable-fs-trees';

/*
Реализуйте и экспортируйте по умолчанию функцию, которая считает количество скрытых файлов
в директории и всех поддиректориях. Скрытым файлом в Linux системах считается файл,
название которого начинается с точки.
*/

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

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('.nginx.conf', { size: 800 }),
    ]),
    mkdir('.consul', [
      mkfile('.config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('.hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

// getHiddenFilesCount(tree); // 3

const getHiddenFilesCount = (node) => {
  if (isFile(node) && getName(node).startsWith('.')) {
    return 1;
  }
  if (isFile(node)) {
    return 0;
  }
  const children = getChildren(node);
  const hiddenFiles = children.map(getHiddenFilesCount);
  return sumOfArrElems(hiddenFiles);
};

console.log(getHiddenFilesCount(tree));

export default getHiddenFilesCount;

/*
// Teacher's solution:
const getHiddenFilesCount = (node) => {
  const name = getName(node);
  if (isFile(node)) {
    return name.startsWith('.') ? 1 : 0;
  }

  const children = getChildren(node);
  const hiddenFilesCounts = children.map(getHiddenFilesCount);
  return _.sum(hiddenFilesCounts);
};

export default getHiddenFilesCount;
*/
