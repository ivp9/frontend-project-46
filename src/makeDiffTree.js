import _ from 'lodash';

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

export default makeDiff;
