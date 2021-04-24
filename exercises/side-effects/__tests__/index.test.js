const os = require('os');
const fs = require('fs');
const path = require('path');

const { upVersion } = require('../src/index.js');
const pj = require('../__fixtures__/package.json');

const tempDir = os.tmpdir();
const tempPath = path.join(tempDir, 'package.json');

const getVersion = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const parsedData = JSON.parse(data);

  return parsedData?.version;
};

describe('side-effects upVersion', () => {
  beforeEach(() => fs.writeFileSync(tempPath, JSON.stringify(pj)));

  test.each([
    ['major', '2.0.0'],
    ['minor', '1.4.0'],
    ['patch', '1.3.3'],
  ])('should return updated %s', (part, expected) => {
    upVersion(tempPath, part);

    const result = getVersion(tempPath);

    expect(result).toBe(expected);
  });

  it('should return updated patch as default', () => {
    upVersion(tempPath);

    const result = getVersion(tempPath);
    const expected = '1.3.3';

    expect(result).toBe(expected);
  });

  it('should return type error for file without version', () => {
    expect(() => upVersion('../package.json')).toThrow(TypeError);
  });

  it('should return type error without args', () => {
    expect(() => upVersion()).toThrow(TypeError);
  });
});
