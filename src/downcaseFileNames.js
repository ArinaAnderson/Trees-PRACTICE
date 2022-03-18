import _ from 'lodash';
import {
  mkdir, mkfile, getChildren, getName, getMeta, isFile,
} from '@hexlet/immutable-fs-trees';

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
      mkfile('config.json'),
    ]),
  ]),
  mkfile('hOsts'),
]);

const downcaseFileNames = (node) => {
  const name = getName(node);
  const newMeta = _.cloneDeep(getMeta(node));
  if (isFile(node)) {
    return mkfile(name.toLowerCase(), newMeta);
  }
  const children = getChildren(node);
  const newChildren = children.map(downcaseFileNames);
  return mkdir(name, newChildren, newMeta);
};

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
