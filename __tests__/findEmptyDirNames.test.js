import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import {
  findEmptyDirNamesReduce,
  findEmptyDirNamesMap,
  // findEmptyDirNamesComplex1,
  findEmptyDirNamesComplex2,
} from '../src/findEmptyDirNames.js';

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf'),
    ]),
    mkdir('consul', [
      mkfile('config.json'),
      mkdir('data'),
    ]),
  ]),
  mkdir('logs'),
  mkfile('hosts'),
]);

const emptyDir = mkdir('empty', []);

const file = { name: 'file1', meta: { size: 125 }, type: 'file' };

describe('testing simple version of findEmptyDirNames', () => {
  test.each([
    { treeStr: tree, expected: ['apache', 'data', 'logs'] },
    { treeStr: emptyDir, expected: 'empty' },
    { treeStr: file, expected: [] },
  ])('testing findEmptyDirNames*', ({ treeStr, expected }) => {
    expect(findEmptyDirNamesMap(treeStr)).toEqual(expected);
    expect(findEmptyDirNamesReduce(treeStr)).toEqual(expected);
  });
});

describe('testing complex version of findEmptyDirNames', () => {
  test('receives non-empty tree and depth of 2', () => {
    expect(findEmptyDirNamesComplex2(tree, 2)).toEqual(['apache', 'logs']);
  });

  test('receives non-empty tree and default depth', () => {
    expect(findEmptyDirNamesComplex2(tree)).toEqual(['apache', 'data', 'logs']);
  });
});

/*
describe('testing simple version of findEmptyDirNames', () => {
  test('receives non-empty tree', () => {
    expect(findEmptyDirNamesMap(tree)).toEqual(['apache', 'data', 'logs']);
    expect(findEmptyDirNamesReduce(tree)).toEqual(['apache', 'data', 'logs']);
  });

  test('receives empty tree', () => {
    expect(findEmptyDirNamesMap(emptyDir)).toEqual('empty');
    expect(findEmptyDirNamesReduce(emptyDir)).toEqual('empty');
  });

  test('receives file', () => {
    expect(findEmptyDirNamesMap(file)).toEqual([]);
    expect(findEmptyDirNamesReduce(file)).toEqual([]);
  });
});
*/
