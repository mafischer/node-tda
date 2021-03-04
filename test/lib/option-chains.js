const { expect } = require('chai');
const optionChains = require('../../lib/option-chains')

describe('Option Chains Test Suite', () => {

  it('should throw not implemented for getOptionChain', () => {
    expect(optionChains.getOptionChain.bind()).to.throw();
  });

});