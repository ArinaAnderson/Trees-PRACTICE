import {
  getChildren,
  getMeta,
  isDirectory,
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';

import compressImages from '../src/compressImages.js';

test('compressImages1A', () => {
  const tree = mkdir('my documents', [
    mkfile('avatar.jpg', { size: 100 }),
    mkfile('passport.jpg', { size: 200 }),
    mkfile('family.jpg', { size: 150 }),
    mkfile('addresses', { size: 125 }),
    mkdir('presentations', [
      mkfile('ch.jpg', { size: 200 }),
      mkfile('rm', { size: 20 }),
      mkdir('newFldre.jpg', [], { size: 90 }),
    ], { size: 20, hidden: false }),
  ]);
  
  const newTree = mkdir('my documents', [
    mkfile('avatar.jpg', { size: 50 }),
    mkfile('passport.jpg', { size: 100 }),
    mkfile('family.jpg', { size: 75 }),
    mkfile('addresses', { size: 125 }),
    mkdir('presentations', [
      mkfile('ch.jpg', { size: 100 }),
      mkfile('rm', { size: 20 }),
      mkdir('newFldre.jpg', [], { size: 90 }),
    ], { size: 20, hidden: false }),
  ]);
  
  expect(compressImages(tree)).toEqual(newTree);
});

test('compressImages1B', () => {
  const tree = mkdir('my documents', [
    mkfile('avatar.jpg', { size: 100 }),
    mkfile('passport.jpg', { size: 200 }),
    mkfile('family.jpg', { size: 150 }),
    mkfile('addresses', { size: 125 }),
    mkdir('presentations', [
      mkfile('ch.jpg', { size: 200 }),
      mkfile('rm', { size: 20 }),
      mkdir('newFldre.jpg', [], { size: 90 }),
    ], { size: 20, hidden: false }),
  ]);

  const newTree = compressImages(tree);

  const expectation = [
    {
      name: 'avatar.jpg',
      meta: { size: 50 },
      type: 'file',
    },
    {
      name: 'passport.jpg',
      meta: { size: 100 },
      type: 'file',
    },
    {
      name: 'family.jpg',
      meta: { size: 75 },
      type: 'file',
    },
    {
      name: 'addresses',
      meta: { size: 125 },
      type: 'file',
    },
    {
      name: 'presentations',
      type: 'directory',
      meta: { size: 20, hidden: false },
      children: [
        {
          name: 'ch.jpg',
          meta: { size: 100 },
          type: 'file',
        },
        {
          name: 'rm',
          meta: { size: 20 },
          type: 'file',
        },
        {
          name: 'newFldre.jpg',
          meta: { size: 90 },
          type: 'directory',
        },
      ],
    },
  ];
  
  expect(newTree).toMatchObject({
    children: expectation,
    type: 'directory',
  });
});

test('comressImages-1-HEXLET', () => {
  const tree = mkdir('my documents', [
    mkdir('documents.jpg'),
    mkfile('avatar.jpg', { size: 100 }),
    mkfile('passport.jpg', { size: 200 }),
    mkfile('family.jpg', { size: 150 }),
    mkfile('addresses', { size: 125 }),
    mkdir('presentations'),
  ], { test: 'haha' });

  const newTree = compressImages(tree);

  const expectation = [
    {
      name: 'documents.jpg',
      type: 'directory',
    },
    {
      name: 'avatar.jpg',
      meta: { size: 50 },
      type: 'file',
    },
    {
      name: 'passport.jpg',
      meta: { size: 100 },
      type: 'file',
    },
    {
      name: 'family.jpg',
      meta: { size: 75 },
      type: 'file',
    },
    {
      name: 'addresses',
      meta: { size: 125 },
      type: 'file',
    },
    {
      name: 'presentations',
      type: 'directory',
    },
  ];

  expect(newTree).toMatchObject({
    meta: { test: 'haha' },
    children: expectation,
  });
});

test('compressImages-2-HEXLET', () => {
  const tree = mkdir('my documents', [
    mkdir('presentations'),
  ]);

  const newTree = compressImages(tree);

  expect(newTree).toMatchObject({
    meta: {},
    children: [
      { name: 'presentations' },
    ],
  });
});

test('compressImages-3-HEXLET', () => {
  const tree = mkdir('my documents', [
    mkfile('avatar.jpg', { size: 100, attributes: { hide: false, readOnly: true } }),
    mkdir('presentations'),
  ]);

  const newTree = compressImages(tree);
  const newTreeChildren = getChildren(newTree);
  const newFileMeta = getMeta(newTreeChildren[0]);
  newFileMeta.attributes.hide = true;

  const treeChildren = getChildren(tree);
  const oldFileMeta = getMeta(treeChildren[0]);

  expect(oldFileMeta.attributes.hide).toEqual(false);
});
