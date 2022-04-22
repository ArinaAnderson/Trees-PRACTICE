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
  test('receives non-empty tree', () => {
    expect(getDirSpaceMap(tree)).toBe(1330);
    expect(getDirSpaceReduce(tree)).toBe(1330);
  });

  test('receives empty tree', () => {
    expect(getDirSpaceMap(emptyDir)).toBe(0);
    expect(getDirSpaceReduce(emptyDir)).toBe(0);
  });

  test('receives file', () => {
    expect(getDirSpaceMap(file)).toBe(125);
    expect(getDirSpaceReduce(file)).toBe(125);
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
