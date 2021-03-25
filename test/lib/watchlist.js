const { expect } = require('chai');
const watchlist = require('../../lib/watchlist')

describe('Watchlist Test Suite', () => {

  it('should throw not implemented for createWatchlist', () => {
    expect(watchlist.createWatchlist.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for deleteWatchlist', () => {
    expect(watchlist.deleteWatchlist.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getWatchlist', () => {
    expect(watchlist.getWatchlist.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getWatchlistsForMultipleAccounts', () => {
    expect(watchlist.getWatchlistsForMultipleAccounts.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getWatchlistForSingleAccount', () => {
    expect(watchlist.getWatchlistForSingleAccount.bind()).to.throw('Not Implemented!');
  });

});
