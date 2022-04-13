import _ from 'lodash';
import {
  mkdir, mkfile, getChildren, getName, getMeta, isFile,
} from '@hexlet/immutable-fs-trees';
import editNodeName from './high-order-functions/editNodeName.js';

/*
Реализуйте и экспортируйте по умолчанию функцию,
которая принимает на вход директорию (объект-дерево),
приводит имена всех файлов в этой и во всех вложенных директориях к нижнему регистру.
Результат в виде обработанной директории возвращается наружу.
*/

const tree = mkdir('/', [
  mkdir('eTc', [
    mkdir('NgiNx'),
    mkdir('CONSUL', [
      mkfile('cOnfig.json'),
      mkfile('SPIRAL.json'),
    ]),
  ]),
  mkfile('hOsts'),
]);

// ORIGINAL VERSION:
export const downcaseFileNamesOriginal = (node) => {
  const name = getName(node);
  const newMeta = _.cloneDeep(getMeta(node));
  if (isFile(node)) {
    return mkfile(name.toLowerCase(), newMeta);
  }
  const children = getChildren(node);
  const newChildren = children.map(downcaseFileNamesOriginal);
  return mkdir(name, newChildren, newMeta);
};

// console.log(JSON.stringify(downcaseFileNamesOriginal(tree), null, '  '));

// USING ABSTRACTIONS:
const downcaseFileNames = (node) => editNodeName(node, (elem) => {
  const name = getName(elem);
  if (isFile(elem)) {
    return name.toLowerCase();
  }
  return name;
});

console.log(JSON.stringify(downcaseFileNames(tree), null, '  '));

export default downcaseFileNames;

/*
// Teacher's solution:
const downcaseFileNames = (node) => {
  const newMeta = _.cloneDeep(getMeta(node));
  const name = getName(node);
  if (isFile(node)) {
    return mkfile(name.toLowerCase(), newMeta);
  }
  const children = getChildren(node);
  const newChildren = children.map(downcaseFileNames);
  return mkdir(name, newChildren, newMeta);
};

export default downcaseFileNames;
*/
