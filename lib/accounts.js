const axios = require('axios');
const qs = require('querystring');

/**
 * Account balances, positions, and orders for a specific account.
 * @param {object} options
 * @param {string} options.accountId Account Number.
 * @param {string} options.token token for authenticated access
 * @param {string} options.fields Balances displayed by default, additional fields can be added here by adding positions or orders. Example: fields=positions,orders
  * @param {function} [callback] optional callback function, returns promise when ommited.
 */
function getAccount({ token, accountId, fields }, callback = undefined) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const query = qs.stringify({
    fields: fields.join(','),
  });

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.tdameritrade.com/v1/accounts/${accountId}?${query}`,
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

/**
 * Account balances, positions, and orders for all linked accounts.
 * @param {object} options
 * @param {string} options.token token for authenticated access
 * @param {string} options.fields Balances displayed by default, additional fields can be added here by adding positions or orders
  * @param {function} [callback] optional callback function, returns promise when ommited.
 */
function getAccounts({ token, fields }, callback = undefined) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const query = qs.stringify({
    fields: fields.join(','),
  });

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.tdameritrade.com/v1/accounts?${query}`,
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
  getAccounts,
};
