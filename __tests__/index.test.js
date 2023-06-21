/* eslint-disable linebreak-style */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

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
const expected = readFile('expectedFile.txt');

test('gendiff test for JSON', () => {
  expect(gendiff(firstFileJSON, secondFileJSON)).toEqual(expected);
});

test('gendiff test for YAML', () => {
  expect(gendiff(firstFileYAML, secondFileYAML)).toEqual(expected);
});

test('gendiff test for YML', () => {
  expect(gendiff(firstFileYML, secondFileYML)).toEqual(expected);
});
