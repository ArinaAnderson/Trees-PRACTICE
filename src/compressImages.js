import _ from 'lodash';
import {
  mkdir, mkfile, isDirectory, getChildren, getName, getMeta,
} from '@hexlet/immutable-fs-trees';

/*
Реализуйте и экспортируйте функцию compressImages(), которая принимает на вход директорию,
находит внутри нее картинки и "сжимает" их. Под сжиманием понимается уменьшение свойства size в метаданных в два раза.
Функция должна вернуть новую директорию со сжатыми картинками и всеми остальными данными,
которые были внутри этой директории.
Картинками считаются все файлы заканчивающиеся на .jpg.
*/

const compressImages = (node) => {
  const children = getChildren(node);
  const newChildren = children.map((el) => {
    const name = getName(el);
    if (isDirectory(el)) {
      return compressImages(el);
    }
    const meta = _.cloneDeep(getMeta(el));
    if (!name.endsWith('.jpg')) {
      return mkfile(name, meta);
    }
    meta.size /= 2;
    return mkfile(name, meta);
  });
  return mkdir(getName(node), newChildren, _.cloneDeep(getMeta(node)));
};

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
