const axios = require('axios');
const qs = require('querystring');

/**
 * Search or retrieve instrument data, including fundamental data.
 * @param {object} options
 * @param {string} options.symbol Value to pass to the search. See projection description for more information.
 * @param {string} options.projection The type of request: symbol-search: Retrieve instrument data of a specific symbol or cusip; symbol-regex: Retrieve instrument data for all symbols matching regex. Example: symbol=XYZ.* will return all symbols beginning with XYZ; desc-search: Retrieve instrument data for instruments whose description contains the word supplied. Example: symbol=FakeCompany will return all instruments with FakeCompany in the description.; desc-regex: Search description with full regex support. Example: symbol=XYZ.[A-C] returns all instruments whose descriptions contain a word beginning with XYZ followed by a character A through C.; fundamental: Returns fundamental data for a single instrument specified by exact symbol.
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] token for authenticated access
 * @param {function} [callback] optional callback function
 */
function searchInstruments(options, callback) {
  const query = {
    projection: options.projection,
    symbol: options.symbol,
  };
  if (options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.tdameritrade.com/v1/instruments?${qs.stringify(query)}`,
        headers,
      });
      if (response.status >= 200 && response.status < 300) {
        resolve(response.data);
      } else {
        reject(new Error(`${response.status}: ${response.statusText}`));
      }
    } catch (err) {
      reject(err);
    }
  });

  if (callback !== undefined && typeof callback === 'function') {
    promise
      .then((response) => {
        callback(null, response);
      })
      .catch((err) => {
        callback(err);
      });
  } else {
    return promise;
  }
}

/**
 * Get an instrument by CUSIP
 * @param {object} options
 * @param {string} options.cusip cusip.
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] token for authenticated access
 * @param {function} [callback] optional callback function
 */
function getInstrument(options, callback) {
  const query = {};
  if (options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.tdameritrade.com/v1/instruments/${options.cusip}?${qs.stringify(query)}`,
        headers,
      });
      if (response.status >= 200 && response.status < 300) {
        resolve(response.data);
      } else {
        reject(new Error(`${response.status}: ${response.statusText}`));
      }
    } catch (err) {
      reject(err);
    }
  });

  if (callback !== undefined && typeof callback === 'function') {
    promise
      .then((response) => {
        callback(null, response);
      })
      .catch((err) => {
        callback(err);
      });
  } else {
    return promise;
  }
}

module.exports = {
  searchInstruments,
  getInstrument,
};
