/* eslint-disable linebreak-style */
import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import getFormatter from './formatters/index.js';
import makeDiff from './makeDiffTree.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const currenDirectory = process.cwd();

  const filePath1 = path.resolve(currenDirectory, filepath1);
  const filePath2 = path.resolve(currenDirectory, filepath2);

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const obj1 = parse(fs.readFileSync(filePath1, 'utf-8'), extension1);
  const obj2 = parse(fs.readFileSync(filePath2, 'utf-8'), extension2);

  const tree = makeDiff(obj1, obj2);
  return getFormatter(tree, formatName);
};

export default genDiff;
