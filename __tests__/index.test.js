/* eslint-disable linebreak-style */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const firstFileJSON = getFixturePath('file1.json');
const secondFileJSON = getFixturePath('file2.json');
const firstFileYAML = getFixturePath('file1.yaml');
const secondFileYAML = getFixturePath('file2.yaml');
const firstFileYML = getFixturePath('file1.yml');
const secondFileYML = getFixturePath('file2.yml');
const expectedStylish = readFile('expectedFileStylish.txt');
const expectedPlain = readFile('expectedFilePlain.txt');
const formatForStylish = 'stylish';
const formatForPlain = 'plain';

test('gendiff test stylish for JSON', () => {
  expect(genDiff(firstFileJSON, secondFileJSON, formatForStylish)).toEqual(expectedStylish);
});

test('gendiff test stylish for YAML', () => {
  expect(genDiff(firstFileYAML, secondFileYAML, formatForStylish)).toEqual(expectedStylish);
});

test('gendiff test stylish for YML', () => {
  expect(genDiff(firstFileYML, secondFileYML, formatForStylish)).toEqual(expectedStylish);
});

test('gendiff test plain for JSON', () => {
  expect(genDiff(firstFileJSON, secondFileJSON, formatForPlain)).toEqual(expectedPlain);
});

test('gendiff test plain for YAML', () => {
  expect(genDiff(firstFileYAML, secondFileYAML, formatForPlain)).toEqual(expectedPlain);
});

test('gendiff test plain for YML', () => {
  expect(genDiff(firstFileYML, secondFileYML, formatForPlain)).toEqual(expectedPlain);
});

test('gendiff test default format for JSON', () => {
  expect(genDiff(firstFileJSON, secondFileJSON)).toEqual(expectedStylish);
});
