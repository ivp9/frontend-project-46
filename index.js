/* eslint-disable linebreak-style */
import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (dataParse1, dataParse2) => {
  const keys1 = _.keys(dataParse1);
  const keys2 = _.keys(dataParse2);
  const keys = _.union(keys1, keys2);

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
  console.log(`{\n${result.join('\n')}\n}`);
};

const gendiff = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const dataParse1 = JSON.parse(data1);
  const dataParse2 = JSON.parse(data2);
  genDiff(dataParse1, dataParse2);
};

export default gendiff;
