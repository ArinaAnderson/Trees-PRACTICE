import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import {
  countNodesMap, countNodesReduce, countNodesAcc,
} from '../src/countNodes.js';

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

describe('testing countNodesMap', () => {
  test('receives non-empty tree', () => {
    expect(countNodesMap(nonEmptyTree)).toBe(8);
  });

  test('receives empty tree', () => {
    expect(countNodesMap(emptyTree)).toBe(1);
  });

  test('receives a file', () => {
    expect(countNodesMap(file)).toBe(1);
  });
});

describe('testing countNodesReduce', () => {
  test('receives non-empty tree', () => {
    expect(countNodesReduce(nonEmptyTree)).toBe(8);
  });

  test('receives empty tree', () => {
    expect(countNodesReduce(emptyTree)).toBe(1);
  });

  test('receives a file', () => {
    expect(countNodesReduce(file)).toBe(1);
  });
});

describe('testing countNodesAcc', () => {
  test('receives non-empty tree', () => {
    expect(countNodesAcc(nonEmptyTree)).toBe(8);
  });

  test('receives empty tree', () => {
    expect(countNodesAcc(emptyTree)).toBe(1);
  });

  test('receives a file', () => {
    expect(countNodesAcc(file)).toBe(1);
  });
});
