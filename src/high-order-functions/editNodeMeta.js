import _ from 'lodash';
import {
  mkdir, mkfile, getChildren, getName, isFile, getMeta,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkdir('CIty-of-tears', [
    mkdir('city-storeroom', [], { owner: 'Basya' }),
    mkdir('King-station', [
      mkfile('.SOUL-sanctum.conf', { owner: 'Basya' }),
    ]),
    mkdir('.fungal-wastes', [
      mkfile('.Mantis-Village.jpg', { size: 32 }),
      mkfile('Fungal-Core', { size: 200 }),
      mkfile('queen-station.jpg', { size: 80, owner: 'Fenya' }),
    ]),
  ]),
  mkfile('.Greenpath', { size: 500, owner: 'Basya' }),
  mkfile('ancient-BAsin.jpg', { size: 1000 }),
]);

const editNodeMeta = (node, callback) => {
  const name = getName(node);
  const editedMeta = callback(node);
  // const editedMeta = callback(getMeta(node));
  if (isFile(node)) {
    return mkfile(name, editedMeta);
  }
  const editedChildren = getChildren(node).map((el) => editNodeMeta(el, callback));
  return mkdir(name, editedChildren, editedMeta);
};

// EXAMPLES:

// different approach:
const changeOwnerOrig = (el, owner) => {
  const newMeta = _.cloneDeep(getMeta(el));
  // const newMeta = _.cloneDeep(meta);
  if (_.has(newMeta, 'owner')) {
    newMeta.owner = owner;
  }
  return newMeta;
};
console.log(JSON.stringify(editNodeMeta(tree, (meta) => changeOwnerOrig(meta, 'SPIRAL')), null, '  '));

// opposite approach:
const changeOwner = (treeData, owner) => editNodeMeta(treeData, (el) => {
  const newMeta = _.cloneDeep(getMeta(el));
  // const newMeta = _.cloneDeep(meta);
  if (_.has(newMeta, 'owner')) {
    newMeta.owner = owner;
  }
  return newMeta;
});
console.log(JSON.stringify(changeOwner(tree, 'MARMU'), null, '  '));

const replaceOwner = (treeData, oldOwner, newOwner) => editNodeMeta(treeData, (el) => {
  const newMeta = _.cloneDeep(getMeta(el));
  // const newMeta = _.cloneDeep(meta);
  if (_.has(newMeta, 'owner') && newMeta.owner === oldOwner) {
    newMeta.owner = newOwner;
  }
  return newMeta;
});
console.log(JSON.stringify(replaceOwner(tree, 'Basya', 'Spiral'), null, '  '));

const compressImages = (node, compression = 2) => editNodeMeta(node, (el) => {
  const newMeta = _.cloneDeep(getMeta(el));

  // here, there is a problem with passing node to getName
  // so, the callback of editNodeMeta needs 1 more parametre: elem (which is node itself)
  if (getName(el).endsWith('jpg') && _.has(newMeta, 'size')) {
    newMeta.size /= compression;
  }
  return newMeta;
});
console.log(JSON.stringify(compressImages(tree, 4), null, '  '));

export default editNodeMeta;
// TO DO:
// -- introduce startLevel finishLevel ??? --> these params must be in callback or specialized func
// -- compressImages based on editNodeMeta...
