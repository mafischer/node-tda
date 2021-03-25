const { expect } = require('chai');
const transactionHistory = require('../../lib/transaction-history');

describe('Transaction History Test Suite', () => {
  it('should throw not implemented for getTransaction', () => {
    expect(transactionHistory.getTransaction.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getTransactions', () => {
    expect(transactionHistory.getTransactions.bind()).to.throw('Not Implemented!');
  });
});
