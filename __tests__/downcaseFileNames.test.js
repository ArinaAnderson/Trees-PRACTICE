// import { fileURLToPath } from 'url';
// import path from 'path';

import _ from 'lodash';
import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';

import downcaseFileNames from '../src/downcaseFileNames.js';

/*
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
*/

describe('should', () => {
  test('be immutable', () => {
    const tree = mkdir('/', [
      mkdir('eTc', [
        mkdir('NgiNx'),
        mkdir('CONSUL', [
          mkfile('config.json'),
        ]),
      ]),
      mkfile('hOsts'),
    ]);
    const original = _.cloneDeep(tree);

    downcaseFileNames(tree);

    expect(tree).toEqual(original);
  });

  test('downcase file names', () => {
    const tree = mkdir('/', [
      mkdir('eTc', [
        mkdir('NgiNx'),
        mkdir('CONSUL', [
          mkfile('config.JSON'),
        ]),
      ]),
      mkfile('hOsts'),
    ]);
    const actual = downcaseFileNames(tree);

    const expected = {
      children: [
        {
          children: [
            {
              name: 'NgiNx',
            },
            {
              children: [{ name: 'config.json' }],
              name: 'CONSUL',
            },
          ],
          name: 'eTc',
        },
        { name: 'hosts' },
      ],
      name: '/',
    };

    expect(actual).toMatchObject(expected);
  });

  test('return full copy', () => {
    const tree = mkdir('/', [
      mkdir('eTc', [
        mkdir('NgiNx', [], { size: 4000 }),
        mkdir('CONSUL', [
          mkfile('config.JSON', { uid: 0 }),
        ]),
      ]),
      mkfile('hOsts'),
    ]);
    const actual = downcaseFileNames(tree);

    const expected = {
      children: [
        {
          children: [
            {
              meta: { size: 4000 },
              name: 'NgiNx',
            },
            {
              children: [{ meta: { uid: 0 }, name: 'config.json' }],
              name: 'CONSUL',
            },
          ],
          name: 'eTc',
        },
        { name: 'hosts' },
      ],
      meta: {},
      name: '/',
    };

    expect(actual).toMatchObject(expected);
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
