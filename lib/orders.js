const qs = require('querystring');
const { axios } = require('../helpers');

/**
 * Cancel a specific order for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {string} options.orderId Order number.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function cancelOrder(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'delete',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/orders/${options.orderId}`,
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
 * Get a specific order for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {string} options.orderId Order number.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getOrder(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/orders/${options.orderId}`,
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
 * Get a specific order for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {string} [options.maxResults] The max number of orders to retrieve.
 * @param {string} [options.fromEnteredTime] Specifies that no orders entered before this time should be returned. Valid ISO-8601 formats are : yyyy-MM-dd. Date must be within 60 days from today's date. 'toEnteredTime' must also be set.
 * @param {string} [options.toEnteredTime] Specifies that no orders entered after this time should be returned.Valid ISO-8601 formats are : yyyy-MM-dd. 'fromEnteredTime' must also be set.
 * @param {string} [options.status] Specifies that only orders of this status should be returned.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getOrdersByPath(options, callback) {
  const query = {};

  if (options.consumerKey) {
    query.maxResults = options.maxResults;
  }
  if (options.fromEnteredTime) {
    query.fromEnteredTime = options.fromEnteredTime;
  }
  if (options.toEnteredTime) {
    query.toEnteredTime = options.toEnteredTime;
  }
  if (options.status) {
    query.status = options.status;
  }

  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/orders?${qs.stringify(query)}`,
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
 * All orders for a specific account or, if account ID isn't specified, orders will be returned for all linked accounts.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} [options.accountId] Account number.
 * @param {string} [options.maxResults] The max number of orders to retrieve.
 * @param {string} [options.fromEnteredTime] Specifies that no orders entered before this time should be returned. Valid ISO-8601 formats are : yyyy-MM-dd. Date must be within 60 days from today's date. 'toEnteredTime' must also be set.
 * @param {string} [options.toEnteredTime] Specifies that no orders entered after this time should be returned.Valid ISO-8601 formats are : yyyy-MM-dd. 'fromEnteredTime' must also be set.
 * @param {string} [options.status] Specifies that only orders of this status should be returned.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getOrdersByQuery(options, callback) {
  const query = {};

  if (options.accountId) {
    query.accountId = options.accountId;
  }
  if (options.maxResults) {
    query.maxResults = options.maxResults;
  }
  if (options.fromEnteredTime) {
    query.fromEnteredTime = options.fromEnteredTime;
  }
  if (options.toEnteredTime) {
    query.toEnteredTime = options.toEnteredTime;
  }
  if (options.status) {
    query.status = options.status;
  }

  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/orders?${qs.stringify(query)}`,
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
 * Place an order for a specific account. See Place Order Samples Guide https://developer.tdameritrade.com/content/place-order-samples.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {string} options.body See documentation at https://developer.tdameritrade.com/account-access/apis/post/accounts/%7BaccountId%7D/orders-0
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function placeOrder(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'post',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/orders`,
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
 * Replace an existing order for an account. The existing order will be replaced by the new order. Once replaced, the old order will be canceled and a new order will be created. See Place Order Samples Guide https://developer.tdameritrade.com/content/place-order-samples.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account number.
 * @param {string} options.orderId Order number.
 * @param {string} options.body See documentation at https://developer.tdameritrade.com/account-access/apis/post/accounts/%7BaccountId%7D/orders-0
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function replaceOrder(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'put',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/orders`,
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

module.exports = {
  cancelOrder,
  getOrder,
  getOrdersByPath,
  getOrdersByQuery,
  placeOrder,
  replaceOrder,
};
