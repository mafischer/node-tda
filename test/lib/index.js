const { expect } = require('chai');
const lib = require('../../lib');

describe('Lib Test Suite', function () {

  it('should export each function', () => {
    
    expect(typeof lib.getAccounts).to.equal('function');
    expect(typeof lib.getAccount).to.equal('function');
    expect(typeof lib.init).to.equal('function');
    expect(typeof lib.authenticate).to.equal('function');
    expect(typeof lib.generateTokens).to.equal('function');
    expect(typeof lib.refreshToken).to.equal('function');
    expect(typeof lib.searchInstruments).to.equal('function');
    expect(typeof lib.getInstrument).to.equal('function');
    expect(typeof lib.getHoursForMultipleMarkets).to.equal('function');
    expect(typeof lib.getHoursForASingleMarket).to.equal('function');
    expect(typeof lib.getMovers).to.equal('function');
    expect(typeof lib.getOptionChain).to.equal('function');
    expect(typeof lib.cancelOrder).to.equal('function');
    expect(typeof lib.getOrder).to.equal('function');
    expect(typeof lib.getOrdersByPath).to.equal('function');
    expect(typeof lib.getOrdersByQuery).to.equal('function');
    expect(typeof lib.placeOrder).to.equal('function');
    expect(typeof lib.replaceOrder).to.equal('function');
    expect(typeof lib.getPriceHistory).to.equal('function');
    expect(typeof lib.getQuote).to.equal('function');
    expect(typeof lib.getQuotes).to.equal('function');
    expect(typeof lib.createSavedOrder).to.equal('function');
    expect(typeof lib.deleteSavedOrder).to.equal('function');
    expect(typeof lib.getSavedOrder).to.equal('function');
    expect(typeof lib.getSavedOrdersByPath).to.equal('function');
    expect(typeof lib.replaceSavedOrder).to.equal('function');
    expect(typeof lib.getTransaction).to.equal('function');
    expect(typeof lib.getTransactions).to.equal('function');
    expect(typeof lib.getPreferences).to.equal('function');
    expect(typeof lib.getStreamerSubscriptionKeys).to.equal('function');
    expect(typeof lib.getUserPrincipals).to.equal('function');
    expect(typeof lib.updatePreferences).to.equal('function');
    expect(typeof lib.createWatchlist).to.equal('function');
    expect(typeof lib.deleteWatchlist).to.equal('function');
    expect(typeof lib.getWatchlist).to.equal('function');
    expect(typeof lib.getWatchlistsForMultipleAccounts).to.equal('function');
    expect(typeof lib.getWatchlistForSingleAccount).to.equal('function');
  });

});
      