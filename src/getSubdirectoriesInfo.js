/*
Напишем функцию, которая принимает на вход директорию и возвращает список директорий
первого уровня вложенности и количество файлов внутри каждой из них, включая все поддиректории
*/

import {
  getName, getChildren, isFile, isDirectory,
} from '@hexlet/immutable-fs-trees';
import sumOfArrElems from './utils.js';

export const getFilesCountMap = (node) => {
  if (isFile(node)) {
    return 1;
  }
  const children = getChildren(node);
  const filesCount = children.map(getFilesCountMap);
  return sumOfArrElems(filesCount);
};

export const getFilesCountReduce = (node) => {
  if (isFile(node)) {
    return 1;
  }
  const result = getChildren(node).reduce((acc, el) => acc + getFilesCountReduce(el), 0);
  return result;
};

export const getSubdirectoriesInfoMap = (dir) => {
  const subDirectories = getChildren(dir).filter(isDirectory);
  const result = subDirectories.map((el) => [getName(el), getFilesCountMap(el)]);
  return result;
};

export const getSubdirectoriesInfoReduce = (dir) => {
  const subDirectories = getChildren(dir).filter(isDirectory);
  const result = subDirectories.reduce((acc, el) => {
    acc.push([getName(el), getFilesCountMap(el)]);
    return acc;
  }, []);
  return result;
};
