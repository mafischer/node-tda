const qs = require('querystring');
const { axios } = require('../helpers');

/**
 * Preferences for a specific account.
 * @param {Object} options
 * @param {string} options.accountId Account Number.
 * @param {string} options.token token for authenticated access
 * @param {Object} options.body See docs at https://developer.tdameritrade.com/user-principal/apis/put/accounts/%7BaccountId%7D/preferences-0
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getPreferences(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/preferences`,
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
 * SubscriptionKey for provided accounts or default accounts.
 * @param {Object} options
 * @param {string} options.token token for authenticated access
 * @param {string} [options.accountIds] A comma separated string of account IDs, to fetch subscription keys for each of them.
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getStreamerSubscriptionKeys(options, callback) {
  const query = {};
  if (options.accountIds) {
    query.accountIds = options.accountIds;
  }

  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/userprincipals/streamersubscriptionkeys?${qs.stringify(query)}`,
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
 * User Principal details.
 * @param {Object} options
 * @param {string} options.token token for authenticated access
 * @param {string} options.fields A comma separated String which allows one to specify additional fields to return. None of these fields are returned by default. Possible values in this String can be: streamerSubscriptionKeys, streamerConnectionInfo, preferences, surrogateIds; Example: fields=streamerSubscriptionKeys,streamerConnectionInfo
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function getUserPrincipals(options, callback) {
  const query = {
    fields: options.fields,
  };

  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/userprincipals?${qs.stringify(query)}`,
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
 * Update preferences for a specific account. Please note that the directOptionsRouting and directEquityRouting values cannot be modified via this operation.
 * @param {Object} options
 * @param {string} options.accountId Account Number.
 * @param {string} options.token token for authenticated access
  * @param {function} [callback] optional callback function, returns promise when ommited., returns promise when omitted.
 */
function updatePreferences(options, callback) {
  const headers = {
    Authorization: `Bearer ${options.token}`,
  };

  const promise = axios({
    method: 'put',
    url: `https://api.tdameritrade.com/v1/accounts/${options.accountId}/preferences`,
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
  getPreferences,
  getStreamerSubscriptionKeys,
  getUserPrincipals,
  updatePreferences,
};
