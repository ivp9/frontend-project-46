/* eslint-disable linebreak-style */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = ['json', 'yaml', 'yml'];
const expectedStylish = readFile('expectedFileStylish.txt');
const expectedPlain = readFile('expectedFilePlain.txt');
const expectedJSON = readFile('expectedFileJSON.txt');

test.each(cases)('gendiff test', (format) => {
  const firstFile = getFixturePath(`file1.${format}`);
  const secondFile = getFixturePath(`file2.${format}`);

  const actualDefaultFormat = genDiff(firstFile, secondFile);
  const actualStylishFormat = genDiff(firstFile, secondFile, 'stylish');
  const actualPlainFormat = genDiff(firstFile, secondFile, 'plain');
  const actualJSONFormat = genDiff(firstFile, secondFile, 'json');

  expect(actualDefaultFormat).toEqual(expectedStylish);
  expect(actualStylishFormat).toEqual(expectedStylish);
  expect(actualPlainFormat).toEqual(expectedPlain);
  expect(actualJSONFormat).toEqual(expectedJSON);
});
