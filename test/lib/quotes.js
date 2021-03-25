const { expect } = require('chai');
const quotes = require('../../lib/quotes')

describe('Quotes Test Suite', () => {

  it('should throw not implemented for getQuote', () => {
    expect(quotes.getQuote.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getQuotes', () => {
    expect(quotes.getQuotes.bind()).to.throw('Not Implemented!');
  });

});