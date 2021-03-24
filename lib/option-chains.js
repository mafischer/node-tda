const { axios } = require('../helpers');
const qs = require('querystring');

/**
 * Top 10 (up or down) movers by value or percent for a particular market
 * @param {object} options 
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] Supply an access token to make an authenticated request.
 * @param {string} options.symbol Enter one symbol.
 * @param {string} [options.contractType] Type of contracts to return in the chain. Can be CALL, PUT, or ALL. Default is ALL.
 * @param {string} options.strikeCount The number of strikes to return above and below the at-the-money price.
 * @param {string} [options.includeQuotes] Include quotes for options in the option chain. Can be TRUE or FALSE. Default is FALSE.
 * @param {string} [options.strategy] Passing a value returns a Strategy Chain. Possible values are SINGLE, ANALYTICAL (allows use of the volatility, underlyingPrice, interestRate, and daysToExpiration params to calculate theoretical values), COVERED, VERTICAL, CALENDAR, STRANGLE, STRADDLE, BUTTERFLY, CONDOR, DIAGONAL, COLLAR, or ROLL. Default is SINGLE.
 * @param {string} options.interval Strike interval for spread strategy chains (see strategy param).
 * @param {string} options.strike Provide a strike price to return options only at that strike price.
 * @param {string} [options.range] Returns options for the given range. Possible values are: ITM: In-the-money, NTM: Near-the-money, OTM: Out-of-the-money, SAK: Strikes Above Market, SBK: Strikes Below Market, SNK: Strikes Near Market, ALL: All Strikes, Default is ALL.
 * @param {string} options.fromDate Only return expirations after this date. For strategies, expiration refers to the nearest term expiration in the strategy. Valid ISO-8601 formats are: yyyy-MM-dd and yyyy-MM-dd'T'HH:mm:ssz.
 * @param {string} options.toDate Only return expirations before this date. For strategies, expiration refers to the nearest term expiration in the strategy. Valid ISO-8601 formats are: yyyy-MM-dd and yyyy-MM-dd'T'HH:mm:ssz.
 * @param {string} [options.volatility] Volatility to use in calculations. Applies only to ANALYTICAL strategy chains (see strategy param).
 * @param {string} [options.underlyingPrice] Underlying price to use in calculations. Applies only to ANALYTICAL strategy chains (see strategy param).
 * @param {string} [options.interestRate] Interest rate to use in calculations. Applies only to ANALYTICAL strategy chains (see strategy param).
 * @param {string} [options.daysToExpiration] Days to expiration to use in calculations. Applies only to ANALYTICAL strategy chains (see strategy param).
 * @param {string} [options.expMonth] Return only options expiring in the specified month. Month is given in the three character format. Example: JAN, Default is ALL.
 * @param {string} [options.optionType] Type of contracts to return. Possible values are: S: Standard contracts, NS: Non-standard contracts, ALL: All contracts, Default is ALL.
 * @param {function} [callback] optional callback function, returns promise when omitted.
 */
function getOptionChain(options, callback) {

  const query = {
    symbol: options.symbol,
    strikeCount: options.strikeCount,
    interval: options.interval,
    strike: options.strike,
    fromDate: options.fromDate,
    toDate: options.toDate,
  };

  if(options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }
  if(options.contractType) {
    query.contractType = options.contractType;
  }
  if(options.includeQuotes) {
    query.includeQuotes = options.includeQuotes;
  }
  if(options.strategy) {
    query.strategy = options.strategy;
  }
  if(options.range) {
    query.range = options.range;
  }
  if(options.volatility) {
    query.volatility = options.volatility;
  }
  if(options.underlyingPrice) {
    query.underlyingPrice = options.underlyingPrice;
  }
  if(options.interestRate) {
    query.interestRate = options.interestRate;
  }
  if(options.daysToExpiration) {
    query.daysToExpiration = options.daysToExpiration;
  }
  if(options.expMonth) {
    query.expMonth = options.expMonth;
  }
  if(options.optionType) {
    query.optionType = options.optionType;
  }

  const headers = {};
  if(options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: 'https://api.tdameritrade.com/v1/marketdata/chains?${qs.stringify(query)}',
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
  getOptionChain
};
