/* eslint-disable linebreak-style */
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParsing from './parsers.js';
import getFormatter from './formatters/index.js';

const makeDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: makeDiff(data1[key], data2[key]), type: 'nested' };
    }
    return data1[key] === data2[key] ? { key, value: data1[key], type: 'unchanged' } : {
      key, value1: data1[key], value2: data2[key], type: 'changed',
    };
  });
  return result;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const currenDirectory = process.cwd();

  const resolvedFile1 = path.resolve(currenDirectory, filepath1);
  const resolvedFile2 = path.resolve(currenDirectory, filepath2);

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const obj1 = getParsing(fs.readFileSync(resolvedFile1, 'utf-8'), extension1);
  const obj2 = getParsing(fs.readFileSync(resolvedFile2, 'utf-8'), extension2);

  const tree = makeDiff(obj1, obj2);
  return getFormatter(tree, formatName);
};

export default genDiff;
