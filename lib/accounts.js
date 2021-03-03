'use strict';
const axios = require('axios');
const qs = require('querystring');

// https://developer.tdameritrade.com/account-access/apis/get/accounts/{accountId}-0
function getAccount({ token, accountId, fields }, callback = undefined) {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const query = qs.stringify({
    fields: fields.join(',')
  });

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.tdameritrade.com/v1/accounts/${accountId}`,
        data: query,
        headers
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
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });
  } else {
    return promise;
  }
}

// https://developer.tdameritrade.com/account-access/apis/get/accounts-0
function getAccounts({ token, fields }, callback = undefined) {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const query = qs.stringify({
    fields: fields.join(',')
  });

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.tdameritrade.com/v1/accounts`,
        data: query,
        headers
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

  if(callback !== undefined && typeof callback === 'function') {
    promise
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });
  } else {
    return promise;
  }
}

module.exports = {
  getAccount,
  getAccounts
};
