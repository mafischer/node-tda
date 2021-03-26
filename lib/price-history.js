const qs = require('querystring');
const { axios } = require('../helpers');

/**
 * Get price history for a symbol.
 * @param {object} options
 * @param {string} options.symbol Enter one symbol (case-sensitive).
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] token for authenticated access
 * @param {string} [options.periodType] The type of period to show. Valid values are day, month, year, or ytd (year to date). Default is day.
 * @param {string} [options.period] The number of periods to show. Example: For a 2 day / 1 min chart, the values would be: period: 2, periodType: day, frequency: 1, frequencyType: min; Valid periods by periodType (defaults marked with an asterisk): day: 1, 2, 3, 4, 5, 10*, month: 1*, 2, 3, 6,year: 1*, 2, 3, 5, 10, 15, 20, ytd: 1*
 * @param {string} [options.frequencyType] The type of frequency with which a new candle is formed. Valid frequencyTypes by periodType (defaults marked with an asterisk): day: minute*, month: daily, weekly*, year: daily, weekly, monthly*, ytd: daily, weekly*
 * @param {string} [options.frequency] The number of the frequencyType to be included in each candle. Valid frequencies by frequencyType (defaults marked with an asterisk): minute: 1*, 5, 10, 15, 30, daily: 1*, weekly: 1*, monthly: 1*
 * @param {string} [options.endDate] End date as milliseconds since epoch. If startDate and endDate are provided, period should not be provided. Default is previous trading day.
 * @param {string} [options.startDate] Start date as milliseconds since epoch. If startDate and endDate are provided, period should not be provided.
 * @param {boolean} [options.needExtendedHoursData] true to return extended hours data, false for regular market hours only. Default is true
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function getPriceHistory(options, callback) {
  const query = {};
  if (options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }
  if (options.periodType) {
    query.periodType = options.periodType;
  }
  if (options.period) {
    query.period = options.period;
  }
  if (options.frequencyType) {
    query.frequencyType = options.frequencyType;
  }
  if (options.frequency) {
    query.frequency = options.frequency;
  }
  if (options.endDate) {
    query.endDate = options.endDate;
  }
  if (options.startDate) {
    query.startDate = options.startDate;
  }
  if (options.needExtendedHoursData) {
    query.needExtendedHoursData = options.needExtendedHoursData;
  }

  const headers = {};
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/marketdata/${options.symbol}/pricehistory?${qs.stringify(query)}`,
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
  getPriceHistory,
};
