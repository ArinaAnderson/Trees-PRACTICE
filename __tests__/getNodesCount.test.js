import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import {
  getNodesCountMap, getNodesCountReduce, getNodesCountAcc, getNodesCountAcc2,
} from '../src/getNodesCount.js';

const nonEmptyTree = mkdir('/', [
  mkdir('etc', [
    mkfile('bashrc'),
    mkfile('consul.cfg'),
  ]),
  mkfile('hexletrc'),
  mkdir('bin', [
    mkfile('ls'),
    mkfile('cat'),
  ]),
]);

const file = { name: undefined, meta: {}, type: 'file' };

const emptyTree = {
  name: undefined,
  children: [],
  meta: {},
  type: 'directory',
};

test.each([
  { treeStr: nonEmptyTree, expected: 8 },
  { treeStr: emptyTree, expected: 1 },
  { treeStr: file, expected: 1 },
])('testing getNodesCount*', ({ treeStr, expected }) => {
  expect(getNodesCountMap(treeStr)).toBe(expected);
  expect(getNodesCountReduce(treeStr)).toBe(expected);
  expect(getNodesCountAcc(treeStr)).toBe(expected);
  expect(getNodesCountAcc2(treeStr)).toBe(expected);
});
/*
describe('testing countNodesMap', () => {
  test('receives non-empty tree', () => {
    expect(getNodesCountMap(nonEmptyTree)).toBe(8);
  });

  test('receives empty tree', () => {
    expect(getNodesCountMap(emptyTree)).toBe(1);
  });

  test('receives a file', () => {
    expect(getNodesCountMap(file)).toBe(1);
  });
});

describe('testing countNodesReduce', () => {
  test('receives non-empty tree', () => {
    expect(getNodesCountReduce(nonEmptyTree)).toBe(8);
  });

  test('receives empty tree', () => {
    expect(getNodesCountReduce(emptyTree)).toBe(1);
  });

  test('receives a file', () => {
    expect(getNodesCountReduce(file)).toBe(1);
  });
});

describe('testing countNodesAcc', () => {
  test('receives non-empty tree', () => {
    expect(getNodesCountAcc(nonEmptyTree)).toBe(8);
  });

  test('receives empty tree', () => {
    expect(getNodesCountAcc(emptyTree)).toBe(1);
  });

  test('receives a file', () => {
    expect(getNodesCountAcc(file)).toBe(1);
  });
});

describe('testing countNodesAcc2', () => {
  test('receives non-empty tree', () => {
    expect(getNodesCountAcc2(nonEmptyTree)).toBe(8);
  });

  test('receives empty tree', () => {
    expect(getNodesCountAcc2(emptyTree)).toBe(1);
  });

  test('receives a file', () => {
    expect(getNodesCountAcc2(file)).toBe(1);
  });
});
*/
