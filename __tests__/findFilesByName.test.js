import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import findFilesByName from '../src/findFilesByName.js';

const tree1 = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

const tree2 = mkdir('/', [
  mkdir('mocha', [
    mkdir('spiral'),
    mkdir('beautiful', [
      mkfile('mocha.conf', { size: 800 }),
    ]),
    mkdir('flower', [
      mkfile('rosie.json', { size: 120 }),
      mkfile('zotie', { size: 1200 }),
      mkfile('mooshka', { size: 70 }),
    ]),
  ]),
  mkfile('marmu', { size: 500 }),
  mkfile('vanya', { size: 80 }),
]);

const emptyDir = mkdir('empty', []);

const file = mkfile('marmu');

test('receives non-empty tree1', () => {
  expect(findFilesByName(tree1, 'co')).toEqual([
    '/etc/nginx/nginx.conf',
    '/etc/consul/config.json',
  ]);
});

test('receives non-empty tree2', () => {
  expect(findFilesByName(tree2, 'mo')).toEqual([
    '/mocha/beautiful/mocha.conf',
    '/mocha/flower/mooshka',
  ]);
});

test('receives an empty dir', () => {
  expect(findFilesByName(emptyDir)).toEqual([]);
});

test('receives file', () => {
  expect(findFilesByName(file, 'mu')).toEqual('marmu');
});
