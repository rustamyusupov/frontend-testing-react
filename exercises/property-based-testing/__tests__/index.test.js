const fc = require("fast-check");

const sort = (data) => data.slice().sort((a, b) => a - b);

describe("array sort", () => {
  it("should return sorted array", () => {
    fc.assert(
      fc.property(fc.int16Array(), (data) => {
        const result = sort(data);

        expect(result).toBeSorted();
      })
    );
  });

  it("should return same length", () => {
    fc.assert(
      fc.property(fc.int16Array(), (data) => {
        const result = sort(data).length;
        const expected = data.length;

        expect(result).toEqual(expected);
      })
    );
  });

  it("should return array with same items", () => {
    const count = (tab, element) => tab.filter((v) => v === element).length;

    fc.assert(
      fc.property(fc.int16Array(), (data) => {
        const sorted = sort(data);

        for (const item of data) {
          const result = count(sorted, item);
          const expected = count(data, item);

          expect(result).toEqual(expected);
        }
      })
    );
  });

  it("should return empty arrray", () => {
    const result = sort([]);
    const expected = [];

    expect(result).toEqual(expected);
  });
});
