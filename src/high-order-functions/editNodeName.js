import _ from 'lodash';
import {
  mkdir, mkfile, getChildren, getName, isDirectory, isFile, getMeta,
} from '@hexlet/immutable-fs-trees';

/*
const tree = mkdir('/', [
  mkdir('CIty-of-tears', [
    mkdir('city-storeroom'),
    mkdir('King-station', [
      mkfile('.SOUL-sanctum.conf', { size: 40 }),
    ]),
    mkdir('.fungal-wastes', [
      mkfile('.Mantis-Village.json', { size: 30 }),
      mkfile('Fungal-Core', { size: 200 }),
      mkfile('queen-station', { size: 80 }),
    ]),
  ]),
  mkfile('.Greenpath', { size: 500 }),
  mkfile('ancient-BAsin', { size: 1000 }),
]);

const tree2 = mkdir('/', [
  mkdir('Greenpath', [
    mkdir('city-storeroom'),
    mkdir('King-station', [
      mkfile('greenpath.conf'),
      mkfile('GREENPATH'),
    ]),
    mkfile('Greenpath'),
  ]),
  mkfile('Greenpath'),
  mkfile('ancient-BAsin'),
]);
*/

const editNodeName = (node, changeNameCallback) => {
  const newName = changeNameCallback(node);
  const newMeta = _.cloneDeep(getMeta(node));
  if (isFile(node)) {
    return mkfile(newName, newMeta);
  }
  const newChildren = getChildren(node).map((el) => editNodeName(el, changeNameCallback));
  return mkdir(newName, newChildren, newMeta);
};

// EXAMPLES:
export const lowerCaseNodeName = (node) => editNodeName(node, (el) => getName(el).toLowerCase());
// console.log(JSON.stringify(lowerCaseNodeName(tree), null, '  '));

export const lowerCaseDirName = (node) => editNodeName(node, (elem) => {
  if (isDirectory(elem)) {
    return getName(elem).toLowerCase();
  }
  return getName(elem);
});
// console.log(JSON.stringify(lowerCaseDirName(tree), null, '  '));

// const lowerCaseNodeNameB = (node) => getName(node).toLowerCase();
// console.log(JSON.stringify(editNodeName(tree, lowerCaseNodeNameB), null, '  '));

export const renameNodeNameOriginal = (node, newName) => editNodeName(node, () => newName);
// console.log(JSON.stringify(renameNodeNameOriginal(tree, 'MARMU'), null, '  '));

export const renameNodeName = (node, oldName, newName) => editNodeName(node, (elem) => {
  if (getName(elem).toLowerCase() === oldName.toLowerCase()) {
    return newName;
  }
  return getName(elem);
});
// console.log(JSON.stringify(renameNodeName(tree2, 'Greenpath', 'QGs'), null, '  '));

export const renameFileName = (node, oldName, newName) => editNodeName(node, (elem) => {
  if (isFile(elem) && getName(elem).toLowerCase() === oldName.toLowerCase()) {
    return newName;
  }
  return getName(elem);
});
// console.log(JSON.stringify(renameFileName(tree2, 'Greenpath', 'QGs'), null, '  '));

/*
export const downcaseFileNames = (node) => editNodeName(node, (elem) => {
  if (isFile(elem)) {
    return getName(elem).toLowerCase();
  }
  return getName(elem);
});
console.log(JSON.stringify(downcaseFileNames(tree), null, '  '));
*/

export default editNodeName;

// ORIGINAL VERSION:
/*
const makeNameLowerCase = (node) => {
  const newName = getName(node).toLowerCase();
  const newMeta = _.cloneDeep(getMeta(node));
  if (isFile(node)) {
    return mkfile(newName, newMeta);
  }
  const children = getChildren(node);
  const newChildren = children.map(makeNameLowerCase);
  return mkdir(newName, newChildren, newMeta);
};
*/
