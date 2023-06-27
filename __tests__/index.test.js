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
const expectedJSON = readFile('expectedFileJSON.txt');
const formatForStylish = 'stylish';
const formatForPlain = 'plain';
const formatForJSON = 'json';

test('gendiff test stylish format', () => {
  expect(genDiff(firstFileJSON, secondFileJSON, formatForStylish)).toEqual(expectedStylish);
  expect(genDiff(firstFileYAML, secondFileYAML, formatForStylish)).toEqual(expectedStylish);
  expect(genDiff(firstFileYML, secondFileYML, formatForStylish)).toEqual(expectedStylish);
});

test('gendiff test plain format', () => {
  expect(genDiff(firstFileJSON, secondFileJSON, formatForPlain)).toEqual(expectedPlain);
  expect(genDiff(firstFileYAML, secondFileYAML, formatForPlain)).toEqual(expectedPlain);
  expect(genDiff(firstFileYML, secondFileYML, formatForPlain)).toEqual(expectedPlain);
});

test('gendiff test JSON format', () => {
  expect(genDiff(firstFileJSON, secondFileJSON, formatForJSON)).toEqual(expectedJSON);
  expect(genDiff(firstFileYAML, secondFileYAML, formatForJSON)).toEqual(expectedJSON);
  expect(genDiff(firstFileYML, secondFileYML, formatForJSON)).toEqual(expectedJSON);
});

test('gendiff test default format for JSON files', () => {
  expect(genDiff(firstFileJSON, secondFileJSON)).toEqual(expectedStylish);
});
