const { axios } = require('../helpers');
const qs = require('querystring');

function getHoursForMultipleMarkets(options, callback) {

  const query = {
    markets: Array.isArray(options.markets)? options.markets.join(',') : undefined,
    date: options.date
  };
  if(options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if(options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/marketdata/hours?${qs.stringify(query)}`,
    headers
  });

  if(callback !== undefined && typeof callback === 'function') {
    promise
      .then((response) => {
        callback(null, response)
      })
      .catch((err) => {
        callback(err);
      });
  } else {
    return promise;
  }
}

function getHoursForASingleMarket(options, callback) {

  const query = {
    date: options.date
  };
  if(options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if(options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/marketdata/${options.market}/hours`,
    headers,
    data: qs.stringify(query)
  });

  if(callback !== undefined && typeof callback === 'function') {
    promise
      .then((response) => {
        callback(null, response)
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
  getHoursForASingleMarket
};
