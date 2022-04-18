import {
  getChildren, getName, isFile,
} from '@hexlet/immutable-fs-trees';
import sumOfArrElems from './utils.js';

/*
Реализуйте и экспортируйте по умолчанию функцию, которая считает количество скрытых файлов
в директории и всех поддиректориях. Скрытым файлом в Linux системах считается файл,
название которого начинается с точки.
*/

const getHiddenFilesCount = (node) => {
  if (isFile(node)) {
    return getName(node).startsWith('.') ? 1 : 0;
  }
  const children = getChildren(node);
  const hiddenFiles = children.map(getHiddenFilesCount);
  return sumOfArrElems(hiddenFiles);
};

export default getHiddenFilesCount;

/*
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
*/
// getHiddenFilesCount(tree); // 3

// Visualization of getHiddenFilesCount(tree):
/*
    res for tree: [ [ [], [ 1 ], [ 1, 0, 0 ] ], 1, 0 ]
              '/: [                                  ]
           'etc': [ [                        ],      ]
        'apache': [ [ []                     ],      ]
         'nginx': [ [ [], []                 ],      ]
   '.nginx.conf': [ [ [], [ 1 ]              ],      ]
       '.consul': [ [ [], [ 1 ], []          ],      ]
  '.config.json': [ [ [], [ 1 ], [ 1 ]       ],      ]
          'data': [ [ [], [ 1 ], [ 1, 0 ]    ],      ]
          'raft': [ [ [], [ 1 ], [ 1, 0, 0 ] ],      ]
        '.hosts': [ [ [], [ 1 ], [ 1, 0, 0 ] ], 1    ]
       'resolve': [ [ [], [ 1 ], [ 1, 0, 0 ] ], 1, 0 ]
*/

/*
// Teacher's solution:
const getHiddenFilesCount = (node) => {
  const name = getName(node);
  if (isFile(node)) {
    return name.startsWith('.') ? 1 : 0;
  }

  const children = getChildren(node);
  const hiddenFilesCounts = children.map(getHiddenFilesCount);
  return _.sum(hiddenFilesCounts);
};

export default getHiddenFilesCount;
*/
