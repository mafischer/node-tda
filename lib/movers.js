const { axios } = require('../helpers');
const qs = require('querystring');

/**
 * Top 10 (up or down) movers by value or percent for a particular market
 * @param {object} options 
 * @param {string} options.index The index symbol to get movers from. Can be $COMPX, $DJI, or $SPX.X.
 * @param {string} [options.consumerKey] Pass your OAuth User ID to make an unauthenticated request for delayed data.
 * @param {string} [options.token] token for authenticated access
 * @param {string} [options.direction] To return movers with the specified directions of up or down
 * @param {string} [options.change] To return movers with the specified change types of percent or value
 * @param {function} [callback] optional callback function
 */
function getMovers(options, callback) {

  const query = {};

  if(options.consumerKey) {
    query.apiKey = `${options.consumerKey}@AMER.OAUTHAP`;
  }
  if(options.direction) {
    query.direction = options.direction;
  }
  if(options.change) {
    query.change = options.change;
  }

  const headers = {};
  if(options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const promise = axios({
    method: 'get',
    url: `https://api.tdameritrade.com/v1/marketdata/${options.index}/movers?${qs.stringify(query)}`,
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
  getMovers
};
