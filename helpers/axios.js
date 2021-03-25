const libAxios = require('axios');

/**
 * Wrapper function to reject with error when status is not 200
 * @param {*} options axios opitons object
 */
async function axios(options) {
  const response = await libAxios(options);
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.data;
}

module.exports = {
  axios,
};
