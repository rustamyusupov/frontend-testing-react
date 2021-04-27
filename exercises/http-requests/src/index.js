const axios = require('axios');

// BEGIN
const get = async (url) => {
  try {
    const response = await axios.get(url);
    const result = response.data;

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const post = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    const result = response.data;

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// END

module.exports = { get, post };
