const fs = require('fs');

// BEGIN
const increment = (version, part = 'patch') => {
  const splitted = version.split('.').map(Number);

  switch (part) {
    case 'major':
      splitted[0] += 1;
      splitted[1] = 0;
      splitted[2] = 0;
      break;

    case 'minor':
      splitted[1] += 1;
      splitted[2] = 0;
      break;

    case 'patch':
      splitted[2] += 1;
      break;

    default:
      break;
  }

  return splitted.join('.');
};

const upVersion = (path, part) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const parsedData = JSON.parse(data);
    const version = increment(parsedData?.version, part);

    fs.writeFileSync(path, JSON.stringify({ version }));
  } catch (error) {
    throw new TypeError(error);
  }
};
// END

module.exports = { upVersion };
