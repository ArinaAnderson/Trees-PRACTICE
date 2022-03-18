import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log({ dirname: __dirname, cwd: process.cwd() });
console.log(import.meta.url);
