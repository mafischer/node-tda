const { expect } = require('chai');
const marketHours = require('../../lib/market-hours')

describe('Market Hours Test Suite', () => {

  it('should throw not implemented for getHoursForMultipleMarkets', () => {
    expect(marketHours.getHoursForMultipleMarkets.bind()).to.throw();
  });

  it('should throw not implemented for getHoursForASingleMarket', () => {
    expect(marketHours.getHoursForASingleMarket.bind()).to.throw();
  });
});