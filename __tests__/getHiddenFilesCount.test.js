import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import getHiddenFilesCount from '../src/getHiddenFilesCount.js';

test('given a tree with hidden files and hidden dirs', () => {
  const tree = mkdir('/', [
    mkdir('city-of-tears', [
      mkdir('.city-storeroom'),
      mkdir('king-station', [
        mkfile('.soul-sanctum.conf', { size: 800 }),
      ]),
      mkdir('.fungal-wastes', [
        mkfile('.mantis-village.json', { size: 1200 }),
        mkfile('fungal-core', { size: 8200 }),
        mkfile('queen-station', { size: 80 }),
      ]),
    ]),
    mkfile('.greenpath', { size: 3500 }),
    mkfile('ancient-basin', { size: 1000 }),
  ]);
  const count = getHiddenFilesCount(tree);
  expect(count).toEqual(3);
});

test('given a tree with no hidden files', () => {
  const tree = mkdir('/', [
    mkdir('.books', [
      mkfile('detective.json', { size: 1200 }),
      mkfile('poem', { size: 8200 }),
      mkfile('biographu', { size: 80 }),
    ]),
    mkfile('HKnight', { size: 3500 }),
    mkfile('secret', { size: 1000 }),
  ]);
  const count = getHiddenFilesCount(tree);
  expect(count).toEqual(0);
});

test('given an emptyTree', () => {
  const emptyTree = {
    name: undefined,
    children: [],
    meta: {},
    type: 'directory',
  };
  const count = getHiddenFilesCount(emptyTree);
  expect(count).toEqual(0);
});
