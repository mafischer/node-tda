const { axios } = require('../helpers');

/**
 * Create watchlist for specific account.This method does not verify that the symbol or asset type are valid.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account Number.
 * @param {string} options.watchlistId The ID of the watchlist to be deleted.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function createWatchlist(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'post',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/watchlists/${options.watchlistId}`,
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
 * Delete watchlist for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account Number.
 * @param {object} options.body See documentation https://developer.tdameritrade.com/watchlist/apis/post/accounts/%7BaccountId%7D/watchlists-0
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function deleteWatchlist(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'delete',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/watchlists`,
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
 * Specific watchlist for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account Number.
 * @param {string} options.watchlistId The ID of the watchlist to be retrieved.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getWatchlist(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/watchlists/${options.watchlistId}`,
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
 * All watchlists for all of the user's linked accounts.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getWatchlistsForMultipleAccounts(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: 'https://api.tdameritrade.com/v1/accounts/watchlists',
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
 * All watchlists of an account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account Number.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getWatchlistForSingleAccount(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/watchlists`,
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
 * Replace watchlist for a specific account.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account Number.
 * @param {string} options.watchlistId The ID of the watchlist to be retrieved.
 * @param {object} options.body See documentation at https://developer.tdameritrade.com/watchlist/apis/put/accounts/%7BaccountId%7D/watchlists/%7BwatchlistId%7D-0
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function replaceWatchlist(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'put',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/watchlists/${options.watchlistId}`,
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
 * Partially update watchlist for a specific account: change watchlist name, add to the beginning/end of a watchlist, update or delete items in a watchlist. This method does not verify that the symbol or asset type are valid.
 * @param {object} options
 * @param {string} options.token Supply an access token to make an authenticated request.
 * @param {string} options.accountId Account Number.
 * @param {string} options.watchlistId The ID of the watchlist to be retrieved.
 * @param {object} options.body See documentation at https://developer.tdameritrade.com/watchlist/apis/put/accounts/%7BaccountId%7D/watchlists/%7BwatchlistId%7D-0
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function updateWatchlist(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'patch',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/watchlists/${options.watchlistId}`,
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
  createWatchlist,
  deleteWatchlist,
  getWatchlist,
  getWatchlistsForMultipleAccounts,
  getWatchlistForSingleAccount,
  replaceWatchlist,
  updateWatchlist,
};
