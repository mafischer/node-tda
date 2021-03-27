const qs = require('querystring');
const { axios } = require('../helpers');

/**
 * Retrieve market hours for specified markets
 * @param {Object} options
 * @param {string} options.markets The markets for which you're requesting market hours, comma-separated. Valid markets are EQUITY, OPTION, FUTURE, BOND, or FOREX.
 * @param {string} options.date The date for which market hours information is requested. Valid ISO-8601 formats are : yyyy-MM-dd and yyyy-MM-dd'T'HH:mm:ssz.
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] token for authenticated access
  * @param {function} [callback] optional callback function, returns promise when ommited.
 */
function getHoursForMultipleMarkets(options, callback) {
  const query = {
    markets: Array.isArray(options.markets) ? options.markets.join(',') : undefined,
    date: options.date,
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
    url: `https://api.tdameritrade.com/v1/marketdata/hours?${qs.stringify(query)}`,
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
 * Retrieve market hours for specified single market
 * @param {Object} options
 * @param {string} options.market The market for which you're requesting market hours. Valid markets are EQUITY, OPTION, FUTURE, BOND, or FOREX. Click to edit the value.
 * @param {string} options.date The date for which market hours information is requested. Valid ISO-8601 formats are : yyyy-MM-dd and yyyy-MM-dd'T'HH:mm:ssz.
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] token for authenticated access
  * @param {function} [callback] optional callback function, returns promise when ommited.
 */
function getHoursForASingleMarket(options, callback) {
  const query = {
    date: options.date,
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
    url: `https://api.tdameritrade.com/v1/marketdata/${options.market}/hours?${qs.stringify(query)}`,
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
  getHoursForMultipleMarkets,
  getHoursForASingleMarket,
};
