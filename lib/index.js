/* eslint-disable global-require */
module.exports = {
  ...require('./accounts'),
  ...require('./authenticate'),
  ...require('./instruments'),
  ...require('./market-hours'),
  ...require('./movers'),
  ...require('./option-chains'),
  ...require('./orders'),
  ...require('./price-history'),
  ...require('./quotes'),
  ...require('./saved-orders'),
  ...require('./transaction-history'),
  ...require('./user-info-and-preferences'),
  ...require('./watchlist'),
};
