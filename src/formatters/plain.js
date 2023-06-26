import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (data, acc) => {
    const lines = data.map((node) => {
      const path = [...acc, node.key].join('.');
      switch (node.type) {
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'added':
          return `Property '${path}' was added with value: ${stringify(node.value)}`;
        case 'changed':
          return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'unchanged':
          return null;
        case 'nested':
          return iter(node.children, [path]);
        default:
          throw new Error('Unsupported node type');
      }
    });
    return lines.filter((element) => element !== null).join('\n');
  };
  return iter(tree, []);
};

export default plain;
