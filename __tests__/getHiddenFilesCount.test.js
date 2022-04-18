import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import getHiddenFilesCount from '../src/getHiddenFilesCount.js';

test('given a tree with hidden files and hidden dirs', () => {
  const tree = mkdir('/', [
    mkdir('etc', [
      mkdir('apache'),
      mkdir('nginx', [
        mkfile('.nginx.conf', { size: 800 }),
      ]),
      mkdir('.consul', [
        mkfile('.config.json', { size: 1200 }),
        mkfile('data', { size: 8200 }),
        mkfile('raft', { size: 80 }),
      ]),
    ]),
    mkfile('.hosts', { size: 3500 }),
    mkfile('resolve', { size: 1000 }),
  ]);
  /*
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
  */
  const count = getHiddenFilesCount(tree);
  expect(count).toEqual(3);
});

test('given a tree with no hidden files', () => {
  /*
  const tree = mkdir('/', [
    mkdir('.fungal-wastes', [
      mkfile('mantis-village.json', { size: 1200 }),
      mkfile('fungal-core', { size: 8200 }),
      mkfile('queen-station', { size: 80 }),
    ]),
    mkfile('greenpath', { size: 3500 }),
    mkfile('ancient-basin', { size: 1000 }),
  ]);
  */
  const tree = mkdir('/', [
    mkdir('.etc', [
      mkdir('.apache'),
      mkdir('nginx', [
        mkfile('nginx.conf', { size: 800 }),
      ]),
    ]),
    mkdir('.consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('.raft', { size: 80 }),
    ]),
    mkfile('hosts', { size: 3500 }),
    mkfile('resolve', { size: 1000 }),
  ]);

  const count = getHiddenFilesCount(tree);
  expect(count).toEqual(1);
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
