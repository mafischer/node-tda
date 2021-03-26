const qs = require('querystring');
const { axios } = require('../helpers');

/**
 * Get quote for a symbol.
 * @param {object} options
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] token for authenticated access
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function getQuote(options, callback) {
  const query = {};
  if (options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/marketdata/${options.symbol}/quotes?${qs.stringify(query)}`,
    headers,
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
 * Get quote for one or more symbols
 * @param {object} options
 * @param {string} options.symbol Enter one or more symbols separated by commas.
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] The Authorization token to validate the request. Not required for un-authenticated requests.
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function getQuotes(options, callback) {
  const query = {
    symbol: options.symbol,
  };
  if (options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/marketdata/quotes?${qs.stringify(query)}`,
    headers,
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
  getQuote,
  getQuotes,
};
