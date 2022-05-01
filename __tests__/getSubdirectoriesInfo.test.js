import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import {
  getFilesCountMap, getFilesCountReduce, getSubdirectoriesInfoMap, getSubdirectoriesInfoReduce,
} from '../src/getSubdirectoriesInfo.js';

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf'),
    ]),
  ]),
  mkdir('consul', [
    mkfile('config.json'),
    mkfile('file.tmp'),
    mkdir('data'),
  ]),
  mkfile('hosts'),
  mkfile('resolve'),
]);

const noFilesTree = mkdir('myCats', [
  mkdir('Marmu&Vanya', [
    mkdir('Marmu', [], { pattern: 'calico-tabby' }),
    mkdir('Vanya', [], { pattern: 'white-and-tabby' }),
  ]),
  mkdir('Gvenya', [], { pattern: 'calico' }),
  mkdir('Spiral', [], { pattern: 'silver-tabby' }),
  mkdir('Rosie', [], { pattern: 'tuxedo' }),
  mkdir('Basya', [], { pattern: 'tabby' }),
]);

const emptyTree = {
  name: undefined,
  children: [],
  meta: {},
  type: 'directory',
};

const file = { name: undefined, meta: {}, type: 'file' };

test.each([
  { treeStr: tree, expected: 5 },
  { treeStr: noFilesTree, expected: 0 },
  { treeStr: emptyTree, expected: 0 },
  { treeStr: file, expected: 1 },
])('testing getFilesCount*', ({ treeStr, expected }) => {
  expect(getFilesCountMap(treeStr)).toBe(expected);
  expect(getFilesCountReduce(treeStr)).toBe(expected);
});

const threeResult = [['etc', 1], ['consul', 2]];
const noFilesTreeResult = [
  ['Marmu&Vanya', 0],
  ['Gvenya', 0],
  ['Spiral', 0],
  ['Rosie', 0],
  ['Basya', 0],
];

test.each([
  { treeStr: tree, expected: threeResult },
  { treeStr: noFilesTree, expected: noFilesTreeResult },
])('testing getSubdirectoriesInfo*', ({ treeStr, expected }) => {
  expect(getSubdirectoriesInfoMap(treeStr)).toEqual(expected);
  expect(getSubdirectoriesInfoReduce(treeStr)).toEqual(expected);
});
/*
describe('testing getFilesCount*', () => {
  test('receives non-empty tree', () => {
    expect(getFilesCountMap(tree)).toBe(5);
    expect(getFilesCountReduce(tree)).toBe(5);
  });

  test('receives tree wo files', () => {
    expect(getFilesCountMap(noFilesTree)).toBe(0);
    expect(getFilesCountReduce(noFilesTree)).toBe(0);
  });

  test('receives empty tree', () => {
    expect(getFilesCountMap(emptyTree)).toBe(0);
    expect(getFilesCountReduce(emptyTree)).toBe(0);
  });

  test('receives a file', () => {
    expect(getFilesCountMap(file)).toBe(1);
    expect(getFilesCountReduce(file)).toBe(1);
  });
});
*/
/*
describe('getSubdirectoriesInfo*', () => {
  test('receives tree', () => {
    expect(getSubdirectoriesInfoMap(tree)).toEqual([['etc', 1], ['consul', 2]]);
    expect(getSubdirectoriesInfoReduce(tree)).toEqual([['etc', 1], ['consul', 2]]);
  });

  test('receives tree wo files', () => {
    expect(getSubdirectoriesInfoMap(noFilesTree)).toEqual([
      ['Marmu&Vanya', 0],
      ['Gvenya', 0],
      ['Spiral', 0],
      ['Rosie', 0],
      ['Basya', 0],
    ]);
    expect(getSubdirectoriesInfoReduce(noFilesTree)).toEqual([
      ['Marmu&Vanya', 0],
      ['Gvenya', 0],
      ['Spiral', 0],
      ['Rosie', 0],
      ['Basya', 0],
    ]);
  });
});
*/
