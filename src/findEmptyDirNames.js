import {
  getChildren, getName, isFile, isDirectory,
} from '@hexlet/immutable-fs-trees';

export const findEmptyDirNamesReduce = (tree) => {
  if (isFile(tree)) {
    return [];
  }
  const children = getChildren(tree);
  if (children.length === 0) {
    return getName(tree);
  }
  const emptyDirsCount = children.reduce((acc, el) => {
    acc.push(findEmptyDirNamesReduce(el));
    return acc;
  }, []);
  return emptyDirsCount.flat();
};

export const findEmptyDirNamesMap = (tree) => {
  if (isFile(tree)) {
    return [];
  }
  const children = getChildren(tree);
  if (children.length === 0) {
    return getName(tree);
  }
  const emptyDirsCount = children.map(findEmptyDirNamesMap);
  return emptyDirsCount.flat();
};

// SAMPLE SOLUTION:
/*
const findEmptyDirNames = (tree) => {
  const name = getName(tree);
  const children = getChildren(tree);
  if (children.length === 0) {
    return name;
  }

  const emptyDirNames = children.filter((child) => !isFile(child))
    .flatMap(findEmptyDirNames);

  return emptyDirNames;
};

findEmptyDirNames(tree); // ['apache', 'data', 'logs']
*/

/*
// too complex:
export const findEmptyDirNamesComplex1 = (tree, maxDepth = Infinity) => {
  const iter = (node, acc) => {
    if (acc > maxDepth) {
      return [];
    }
    if (isFile(node)) {
      return [];
    }
    const children = getChildren(node);
    if (children.length === 0) {
      return getName(node);
    }
    const emptyDirNames = children.map((child) => iter(child, acc + 1));
    return emptyDirNames.flat();
  };
  return iter(tree, 0);
};
*/

export const findEmptyDirNamesComplex2 = (tree, maxDepth = Infinity) => {
  if (isFile(tree)) {
    return [];
  }
  const iter = (node, acc) => {
    if (acc > maxDepth) {
      return [];
    }
    const children = getChildren(node);
    if (children.length === 0) {
      return getName(node);
    }
    const emptyDirNames = children.filter(isDirectory)
      .map((child) => iter(child, acc + 1));
    return emptyDirNames.flat();
  };
  return iter(tree, 0);
};

// SAMPLE SOLUTION:
/*
const findEmptyDirPaths = (tree) => {
  const iter = (node, depth) => {
    const name = getName(node);
    const children = getChildren(node);

    if (children.length === 0) {
      return name;
    }

    if (depth === 2) {
      return [];
    }

    return children.filter(isDirectory)
      .flatMap((child) => iter(child, depth + 1));

  };
  return iter(tree, 0);
};
*/
