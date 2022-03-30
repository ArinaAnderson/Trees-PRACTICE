import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log({ dirname: __dirname, cwd: process.cwd() });
console.log(import.meta.url);

// calling 'node index.js' at the root of the project
/*
{
  dirname: '/Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE',
  cwd: '/Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE/src'
}
file:///Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE/index.js
*/

// calling 'node ../index.js' at the location ./src
/*
{
  dirname: '/Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE',
  cwd: '/Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE/src'
}
file:///Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE/index.js
*/
