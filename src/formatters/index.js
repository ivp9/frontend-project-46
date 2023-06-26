import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error('Unknown format');
  }
};

export default getFormatter;
