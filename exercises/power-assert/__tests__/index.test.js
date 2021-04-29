const assert = require('power-assert');
const { flattenDepth } = require('lodash');

// BEGIN
const array = [1, [2, [3, [4]], 5]];

assert.deepEqual(
  flattenDepth(array),
  [1, 2, [3, [4]], 5],
  'should return with default depth'
);

assert.deepEqual(
  flattenDepth(array, 1),
  [1, 2, [3, [4]], 5],
  'should return with 1 depth'
);

assert.deepEqual(
  flattenDepth(array, 2),
  [1, 2, 3, [4], 5],
  'should return with 2 depth'
);

assert.deepEqual(
  flattenDepth(array, 3),
  [1, 2, 3, 4, 5],
  'should return with 3 depth'
);

assert.deepEqual(flattenDepth([]), [], 'should return empty array');
// END
