import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

console.log(__dirname);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE/__tests__

console.log(__filename);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/
// Tree/PRACTICE/Trees-PRACTICE/__tests__/downcaseFileNames.test.js

console.log(path.join(__dirname, '..'));
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE

console.log(path.resolve(__dirname, '..'));
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Tree/PRACTICE/Trees-PRACTICE

console.log(path.join(__dirname, '..', '__fixtures__', 'downcaseFileNamesData-1.json'));
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/
// Tree/PRACTICE/Trees-PRACTICE/__fixtures__/downcaseFileNamesData-1.json

console.log(getFixturePath('downcaseFileNamesData-1.json'));
