const { axios } = require('../helpers');

/**
 * Save an order for a specific account. See Place Order Samples Guide https://developer.tdameritrade.com/content/place-order-samples.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {string} options.body See documentation at https://developer.tdameritrade.com/account-access/apis/post/accounts/%7BaccountId%7D/savedorders-0
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function createSavedOrder(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'post',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/savedorders`,
    headers,
    data: options.body,
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
 * Delete a specific saved order for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {string} options.savedOrderId Saved Order Number.
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function deleteSavedOrder(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'delete',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/savedorders/${options.savedOrderId}`,
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
 * Specific saved order by its ID, for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function getSavedOrder(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/savedorders/${options.savedOrderId}`,
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
 * Saved orders for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function getSavedOrdersByPath(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/savedorders`,
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
 * Replace an existing saved order for an account. The existing saved order will be replaced by the new order. See Place Order Samples Guide https://developer.tdameritrade.com/content/place-order-samples.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {string} options.savedOrderId Saved Order Number.
 * @param {string} options.body See documentation at https://developer.tdameritrade.com/account-access/apis/post/accounts/%7BaccountId%7D/savedorders-0
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function replaceSavedOrder(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'put',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/savedorders/${options.savedOrderId}`,
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
  createSavedOrder,
  deleteSavedOrder,
  getSavedOrder,
  getSavedOrdersByPath,
  replaceSavedOrder,
};
