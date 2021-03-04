const { expect } = require('chai');
const movers = require('../../lib/movers')

describe('Movers Test Suite', () => {

  it('should throw not implemented for getMovers', () => {
    expect(movers.getMovers.bind()).to.throw();
  });

});