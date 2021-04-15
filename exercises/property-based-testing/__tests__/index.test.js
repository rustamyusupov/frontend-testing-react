const fc = require('fast-check');

const sort = (data) => data.slice().sort((a, b) => a - b);
const isEquals = (a, b) => a.length === b.length && a.every((v) => b.includes(v));

describe('array sort', () => {
  it('should return sorted array', () => {
    fc.assert(
      fc.property(fc.int16Array(), (data) => {
        const result = sort(data);

        expect(result).toBeSorted();
      }),
    );
  });

  it('should return same length', () => {
    fc.assert(
      fc.property(fc.int16Array(), (data) => {
        const result = sort(data).length;
        const expected = data.length;

        expect(result).toEqual(expected);
      }),
    );
  });

  it('should return array with same items', () => {
    fc.assert(
      fc.property(fc.int16Array(), (data) => {
        const sorted = sort(data);
        const result = isEquals(sorted, data);

        expect(result).toBeTruthy();
      }),
    );
  });

  it('should return empty arrray', () => {
    const result = sort([]);
    const expected = [];

    expect(result).toEqual(expected);
  });
});
