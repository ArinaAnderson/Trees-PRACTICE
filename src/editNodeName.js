import _ from 'lodash';
import {
  mkdir, mkfile, getChildren, getName, isFile, getMeta,
} from '@hexlet/immutable-fs-trees';

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

const editNodeName = (node, callback) => {
  const newName = callback(getName(node));
  const newMeta = _.cloneDeep(getMeta(node));
  if (isFile(node)) {
    return mkfile(newName, newMeta);
  }
  const newChildren = getChildren(node).map((el) => editNodeName(el, callback));
  return mkdir(newName, newChildren, newMeta);
};

console.log(JSON.stringify(editNodeName(tree, (name) => name.toLowerCase()), null, '  '));
console.log(JSON.stringify(editNodeName(tree, () => 'Marmu'), null, '  '));
