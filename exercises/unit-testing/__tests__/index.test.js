describe("object assign", () => {
  it("should return union object", () => {
    const src = { k: "v", b: "b" };
    const target = { k: "v2", a: "a" };
    const result = Object.assign(target, src);
    const expected = { a: "a", b: "b", k: "v" };

    expect(result).toEqual(expected);
  });

  it("should return nested object", () => {
    const src = { a: 1, b: { c: 2 } };
    const target = { d: "test", e: { f: { g: 123 } } };
    const result = Object.assign(target, src);
    const expected = { a: 1, b: { c: 2 }, d: "test", e: { f: { g: 123 } } };

    expect(result).toEqual(expected);
  });

  it("should return target when source null", () => {
    const src = null;
    const target = { a: 1 };
    const result = Object.assign(target, src);
    const expected = { a: 1 };

    expect(result).toEqual(expected);
  });

  it("should return union of objects", () => {
    const src = { b: 2 };
    const src1 = { c: 3 };
    const src2 = { d: 4 };
    const target = { a: 1 };
    const result = Object.assign(target, src, src1, src2);
    const expected = { a: 1, b: 2, c: 3, d: 4 };

    expect(result).toEqual(expected);
  });

  it("should return empty object", () => {
    const src = {};
    const target = {};
    const result = Object.assign(target, src);
    const expected = {};

    expect(result).toEqual(expected);
  });
});
