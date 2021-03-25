const { expect } = require('chai');
const priceHistory = require('../../lib/price-history');

describe('Price History Test Suite', () => {
  it('should throw not implemented for getPriceHistory', () => {
    expect(priceHistory.getPriceHistory.bind()).to.throw('Not Implemented!');
  });
});
