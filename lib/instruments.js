const axios = require('axios');

function searchInstruments(options, callback) {

  const query = {
    projection: options.projection,
    symbol: options.symbol
  };
  if(options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if(options.Authorization) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: 'https://api.tdameritrade.com/v1/instruments?symbol=TSLA&projection=symbol-search',
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

function getIntrument(options, callback) {

  const query = {};
  if(options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if(options.Authorization) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/instruments/${options.cusip}`,
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

module.exports = {
  searchInstruments,
  getIntrument
}
