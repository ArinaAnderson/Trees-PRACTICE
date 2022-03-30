import path from 'path';
import _ from 'lodash';
import {
  mkdir, mkfile, isDirectory, getChildren, getName, getMeta, isFile,
} from '@hexlet/immutable-fs-trees';

/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход файловое дерево
и подстроку, а возвращает список файлов, имена которых содержат эту подстроку.
Функция должна вернуть полные пути до файлов.
*/

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);
 
// findFilesByName(tree, 'co');
// ['/etc/nginx/nginx.conf', '/etc/consul/config.json']

/*
const findFilesByName = (node, str) => {
  const iter = (elem, ancestry) => {
    const elemName = getName(elem);
    if (isFile(elem) && elemName.includes(str)) {
      return path.join(ancestry, elemName);
    }

    if (isFile(elem)) {
      return '';
    }

    const children = getChildren(elem);
    const paths = children.map((child) => iter(child, `${ancestry}/${elemName}`));
    return paths;
  };

  return iter(node, '');
};
*/

const findFilesByName = (node, str) => {
  const iter = (elem, ancestry) => {
    const elemName = getName(elem);
    if (isFile(elem) && elemName.includes(str)) {
      return path.join(ancestry, elemName);
    }

    if (isFile(elem)) {
      return [];
    }

    const children = getChildren(elem);
    const paths = children.map((child) => iter(child, `${ancestry}/${elemName}`));
    return paths.flat();
  };

  return iter(node, '');
};

console.log(findFilesByName(tree, 'co'));

/*
// Teacher's solution:
const findFilesByName = (tree, substr) => {
  const iter = (node, ancestry) => {
    const name = getName(node);
    const newAncestry = path.join(ancestry, name);
    if (isFile(node)) {
      return name.includes(substr) ? newAncestry : [];
    }
    const children = getChildren(node);
    return children.flatMap((child) => iter(child, newAncestry));
  };

  return iter(tree, '');
};

export default findFilesByName;
*/
