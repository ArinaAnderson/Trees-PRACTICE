// import { fileURLToPath } from 'url';
// import path from 'path';

import _ from 'lodash';
import {
  mkdir, mkfile, getMeta, getChildren,
} from '@hexlet/immutable-fs-trees';

import downcaseFileNames from '../src/downcaseFileNames.js';

// - immutable (cloneDeep is the same by value; changing prop in newTree and checking it in tree)
// - works
// - return full copy'

/*
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
*/

const tree = mkdir('/', [
  mkdir('eTc', [
    mkfile('NgiNx', { owner: 'Basya' }),
    mkdir('CONSUL', [
      mkfile('Config.JSON', { size: 10 }),
    ]),
  ]),
  mkfile('hOsts'),
]);

const treeComplex = mkdir('/', [
  mkfile('Spiral', {
    characteristics: {
      id: 'spiral2018',
      owner: 'SpiralTheCat',
      activities: {
        night: 'catnip search',
        daytinme: 'nap',
        morning: 'chat w squirels',
      },
    },
  }),
  mkdir('MOCHA-fam', [
    mkfile('mArmU', {
      owner: 'Marmu',
      colours: [
        'white', 'lightbrown', 'red',
      ],
    }),
  ]),
]);

describe('should', () => {
  test('immutable-A', () => {
    const originalTree = _.cloneDeep(tree);
    downcaseFileNames(tree);
    expect(originalTree).toEqual(tree);
  });

  test('immutable-B', () => {
    const newTree = downcaseFileNames(tree);
    const newTreeOwnerMeta = getMeta(getChildren(getChildren(newTree)[0])[0]);
    newTreeOwnerMeta.owner = 'Fenya';
    const treeOwnerMeta = getMeta(getChildren(getChildren(tree)[0])[0]);
    expect(newTreeOwnerMeta.owner).not.toEqual(treeOwnerMeta.owner);
  });

  test('downcase fileNames', () => {
    const newTree = downcaseFileNames(tree);
    const expectedChildren = [
      {
        name: 'eTc',
        children: [
          { name: 'nginx' },
          {
            name: 'CONSUL',
            children: [
              { name: 'config.json' },
            ],
          },
        ],
      },
      {
        name: 'hosts',
      },
    ];
    expect(newTree).toMatchObject({
      children: expectedChildren,
    });
  });

  test('return full copy', () => {
    const newTree = downcaseFileNames(treeComplex);
    const expectedChildren = [
      {
        name: 'spiral',
        meta: {
          characteristics: {
            id: 'spiral2018',
            owner: 'SpiralTheCat',
            activities: {
              night: 'catnip search',
              daytinme: 'nap',
              morning: 'chat w squirels',
            },
          },
        },
      },
      {
        name: 'MOCHA-fam',
        children: [
          {
            name: 'marmu',
            meta: {
              owner: 'Marmu',
              colours: [
                'white', 'lightbrown', 'red',
              ],
            },
          },
        ],
      },
    ];
    expect(newTree).toMatchObject({
      children: expectedChildren,
    });
  });
});

/*
console.log(__dirname);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE/__tests__

console.log(__filename);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/
// Trees-PRACTICE/__tests__/downcaseFileNames.test.js

console.log(path.join(__dirname, '..'));
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE

console.log(path.resolve(__dirname, '..'));
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE

console.log(path.join(__dirname, '..', '__fixtures__', 'downcaseFileNamesData-1.json'));
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/
// Trees-PRACTICE/__fixtures__/downcaseFileNamesData-1.json
*/
