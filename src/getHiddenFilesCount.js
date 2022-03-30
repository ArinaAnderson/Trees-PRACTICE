import {
  mkdir, mkfile, getChildren, getName, isFile,
} from '@hexlet/immutable-fs-trees';
import sumOfArrElems from './utils.js';

/*
Реализуйте и экспортируйте по умолчанию функцию, которая считает количество скрытых файлов
в директории и всех поддиректориях. Скрытым файлом в Linux системах считается файл,
название которого начинается с точки.
*/

const tree = mkdir('/', [
  mkdir('city-of-tears', [
    mkdir('city-storeroom'),
    mkdir('king-station', [
      mkfile('.soul-sanctum.conf', { size: 800 }),
    ]),
    mkdir('.fungal-wastes', [
      mkfile('.mantis-village.json', { size: 1200 }),
      mkfile('fungal-core', { size: 8200 }),
      mkfile('queen-station', { size: 80 }),
    ]),
  ]),
  mkfile('.greenpath', { size: 3500 }),
  mkfile('ancient-basin', { size: 1000 }),
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
