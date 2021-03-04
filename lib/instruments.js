const axios = require('axios');
const qs = require('querystring');

function searchInstruments(options, callback) {

  const query = {
    projection: options.projection,
    symbol: options.symbol
  };
  if(options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if(options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://api.tdameritrade.com/v1/instruments',
        headers,
        data: qs.stringify(query)
      });
      if (response.status >= 200 && response.status < 300) {
        resolve(response.data);
      } else {
        reject(new Error(`${response.status}: ${response.statusText}`));
      }
    } catch(err) {
      reject(err);
    }
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

function getInstrument(options, callback) {

  const query = {};
  if(options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }

  const headers = {};
  if(options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.tdameritrade.com/v1/instruments/${options.cusip}`,
        headers,
        data: qs.stringify(query)
      });
      if (response.status >= 200 && response.status < 300) {
        resolve(response.data);
      } else {
        reject(new Error(`${response.status}: ${response.statusText}`));
      }
    } catch(err) {
      reject(err);
    }
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
  getInstrument
}
