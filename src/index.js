/* eslint-disable linebreak-style */
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParsing from './parsers.js';

const genDiff = (dataParse1, dataParse2) => {
  const keys1 = _.keys(dataParse1);
  const keys2 = _.keys(dataParse2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (!_.has(dataParse1, key)) {
      const elementOfArr = `  + ${key}: ${dataParse2[key]}`;
      result.push(elementOfArr);
    } else if (!_.has(dataParse2, key)) {
      const elementOfArr = `  - ${key}: ${dataParse1[key]}`;
      result.push(elementOfArr);
    } else if (dataParse1[key] !== dataParse2[key]) {
      const elementOfArr1 = `  - ${key}: ${dataParse1[key]}`;
      const elementOfArr2 = `  + ${key}: ${dataParse2[key]}`;
      result.push(elementOfArr1);
      result.push(elementOfArr2);
    } else {
      const elementOfArr = `    ${key}: ${dataParse2[key]}`;
      result.push(elementOfArr);
    }
  }
  return result;
};

const gendiff = (filepath1, filepath2) => {
  const currenDirectory = process.cwd();

  const resolvedFile1 = path.resolve(currenDirectory, filepath1);
  const resolvedFile2 = path.resolve(currenDirectory, filepath2);

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const obj1 = getParsing(fs.readFileSync(resolvedFile1, 'utf-8'), extension1);
  const obj2 = getParsing(fs.readFileSync(resolvedFile2, 'utf-8'), extension2);

  const result = genDiff(obj1, obj2);
  return `{\n${result.join('\n')}\n}`;
};

export default gendiff;
