const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

const transactionHistory = require('../../lib/transaction-history');

describe('Transaction History Test Suite', () => {
  it('should throw not implemented for getTransaction', () => {
    expect(transactionHistory.getTransaction.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getTransactions', () => {
    expect(transactionHistory.getTransactions.bind()).to.throw('Not Implemented!');
  });
});
