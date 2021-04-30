const assert = require('power-assert');
const { flattenDepth } = require('lodash');

// BEGIN
const array = [1, [2, [3, [4]], 5]];
const cases = [
  // data depth      expected             description
  [array, undefined, [1, 2, [3, [4]], 5], 'default depth'],
  [array, 1, [1, 2, [3, [4]], 5], '1 depth'],
  [array, 2, [1, 2, 3, [4], 5], '2 depth'],
  [array, 3, [1, 2, 3, 4, 5], '3 depth'],
  [[], undefined, [], 'empty array'],
];

cases.forEach(([data, depth, expected, description]) =>
  assert.deepEqual(flattenDepth(data, depth), expected, description)
);
// END
