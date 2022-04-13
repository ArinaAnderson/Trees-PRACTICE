import _ from 'lodash';
import {
  mkdir, mkfile, isDirectory, getChildren, getName, getMeta,
} from '@hexlet/immutable-fs-trees';
import editNodeMeta from './high-order-functions/editNodeMeta.js';

/*
Реализуйте и экспортируйте функцию compressImages(), которая принимает на вход директорию,
находит внутри нее картинки и "сжимает" их.
Под сжиманием понимается уменьшение свойства size в метаданных в два раза.
Функция должна вернуть новую директорию со сжатыми картинками и всеми остальными данными,
которые были внутри этой директории.
Картинками считаются все файлы заканчивающиеся на .jpg.
*/

// ORIGINAL VERSION:
/*
export const compressImagesOriginal = (dir, compression = 2) => {
  const children = getChildren(dir);
  const compressedChildren = children.map((el) => {
    if (isDirectory(el)) {
      return compressImagesOriginal(el, compression);
    }
    const name = getName(el);
    const clonedMeta = _.cloneDeep(getMeta(el));

    if (name.endsWith('jpg') && _.has(clonedMeta, 'size')) {
      clonedMeta.size /= compression;
    }
    return mkfile(name, clonedMeta);
  });
  return mkdir(getName(dir), compressedChildren, _.cloneDeep(getMeta(dir)));
};
*/

// USING ABSTRACTIONS:
const compressImages = (node, compression = 2) => editNodeMeta(node, (el) => {
  const clonedMeta = _.cloneDeep(getMeta(el));
  if (getName(el).endsWith('jpg') && _.has(clonedMeta, 'size')) {
    clonedMeta.size /= compression;
  }
  return clonedMeta;
});

export default compressImages;

// printing to see the result:
/*
const tree = mkdir('my documents', [
  mkfile('avatar.jpg', { size: 100 }),
  mkfile('passport.jpg', { size: 200 }),
  mkfile('family.jpg', { size: 150 }),
  mkfile('addresses', { size: 125 }),
  mkdir('presentations', [
    mkfile('ch.jpg', { size: 200 }),
    mkfile('rm', { size: 20 }),
    mkdir('newFldre.jpg', [], { size: 90 }),
  ], { size: 20, hidden: false }),
]);

console.log(JSON.stringify(compressImages(tree), null, '  '));
*/

/*
// Teacher's solution:
export const compressImages = (node) => {
  const children = getChildren(node);
  const newChildren = children.map((child) => {
  const name = getName(child);
  if (!isFile(child) || !name.endsWith('.jpg')) {
    return child;
  }
  const meta = getMeta(child);
  const newMeta = _.cloneDeep(meta);
  newMeta.size /= 2;
  return mkfile(name, newMeta);
  });
  const newMeta = _.cloneDeep(getMeta(node));
  return mkdir(getName(node), newChildren, newMeta);
};
*/
