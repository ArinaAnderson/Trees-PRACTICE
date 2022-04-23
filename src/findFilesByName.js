import path from 'path';
import {
  getChildren, getName, isFile,
} from '@hexlet/immutable-fs-trees';

/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход файловое дерево
и подстроку, а возвращает список файлов, имена которых содержат эту подстроку.
Функция должна вернуть полные пути до файлов.
*/

const findFilesByName = (node, str) => {
  const iter = (acc, el) => {
    const name = getName(el);
    if (isFile(el)) {
      return name.includes(str) ? path.join(acc, name) : [];
    }
    const children = getChildren(el);
    const paths = children.map((child) => iter(path.join(acc, name), child));
    return paths.flat();
  };
  return iter('', node);
};

export default findFilesByName;

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
