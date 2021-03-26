const qs = require('querystring');
const { axios } = require('../helpers');

/**
 * Transaction for a specific account.
 * @param {object} options
 * @param {string} options.accountId Account Number.
 * @param {string} options.transactionId Transaction ID.
 * @param {string} options.token token for authenticated access
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function getTransaction(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/transactions/${options.transactionId}`,
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
 * Transactions for a specific account.
 * @param {object} options
 * @param {string} options.accountId Account Number.
 * @param {string} options.token token for authenticated access
 * @param {string} [options.type] Only transactions with the specified type will be returned.
 * @param {string} [options.symbol] Only transactions with the specified symbol will be returned.
 * @param {string} [options.startDate] Only transactions after the Start Date will be returned. Note: The maximum date range is one year. Valid ISO-8601 formats are : yyyy-MM-dd.
 * @param {string} [options.endDate] Only transactions before the End Date will be returned. Note: The maximum date range is one year. Valid ISO-8601 formats are : yyyy-MM-dd.
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function getTransactions(options, callback) {
  const query = {};
  if (options.type) {
    query.type = options.type;
  }
  if (options.symbol) {
    query.symbol = options.symbol;
  }
  if (options.startDate) {
    query.startDate = options.startDate;
  }
  if (options.endDate) {
    query.endDate = options.endDate;
  }

  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/transactions?${qs.stringify(query)}`,
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
  getTransaction,
  getTransactions,
};
