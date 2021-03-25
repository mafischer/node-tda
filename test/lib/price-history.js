const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

const priceHistory = require('../../lib/price-history');

describe('Price History Test Suite', () => {
  it('should throw not implemented for getPriceHistory', () => {
    expect(priceHistory.getPriceHistory.bind()).to.throw('Not Implemented!');
  });
});
