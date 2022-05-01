import {
  getChildren,
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import {
  getDirSpaceReduce, getDirSpaceMap, du,
} from '../src/du.js';

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 500 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 300 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 350 }),
  mkfile('resolve', { size: 100 }),
]);

const emptyDir = mkdir('empty', []);

const file = { name: 'file1', meta: { size: 125 }, type: 'file' };

describe('testing getDirSpace*', () => {
  test.each([
    { treeStr: tree, expected: 1330 },
    { treeStr: emptyDir, expected: 0 },
    { treeStr: file, expected: 125 },
  ])('testing getDirSpace*', ({ treeStr, expected }) => {
    expect(getDirSpaceMap(treeStr)).toEqual(expected);
    expect(getDirSpaceReduce(treeStr)).toEqual(expected);
  });
});

describe('testing du', () => {
  test('receives non-empty tree', () => {
    expect(du(tree)).toEqual([['etc', 880], ['hosts', 350], ['resolve', 100]]);
    expect(du(getChildren(tree)[0])).toEqual([['nginx', 500], ['consul', 380], ['apache', 0]]);
  });

  test('receives empty tree', () => {
    expect(du(emptyDir)).toEqual([]);
  });
});
