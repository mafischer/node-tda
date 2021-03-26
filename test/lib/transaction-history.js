const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Transaction History Test Suite', () => {
  let sandbox; let axiosSuccess; let axiosNotFound; let
    axiosFailure;

  before(() => {
    sandbox = sinon.createSandbox();
    axiosSuccess = sandbox.stub().resolves({
      pizza: 'pepperoni',
    });
    axiosNotFound = sandbox.stub().rejects(new Error('404: Account not found!'));
    axiosFailure = sandbox.stub().rejects(new Error('500: oops!'));
  });

  beforeEach(() => {
    axiosFailure.resetHistory();
    axiosNotFound.resetHistory();
    axiosSuccess.resetHistory();
  });

  after(() => {
    sandbox.restore();
  });

  describe('getTransaction Tests', () => {
    it('should return data upon success', async () => {
      const { getTransaction } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getTransaction({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getTransaction } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getTransaction({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getTransaction } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getTransaction({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getTransaction } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getTransaction({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getTransaction } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getTransaction({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getTransaction } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getTransaction({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('getTransactions Tests', () => {
    it('should return data upon success', async () => {
      const { getTransactions } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getTransactions({
        token: 'key',
        type: 'TSLA',
        symbol: 'WMT',
        startDate: '123',
        endDate: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getTransactions } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getTransactions({
        token: 'key',
        type: 'TSLA',
        symbol: 'WMT',
        startDate: '123',
        endDate: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getTransactions } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getTransactions({
        token: 'key',
        type: 'TSLA',
        symbol: 'WMT',
        startDate: '123',
        endDate: '123',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getTransactions } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getTransactions({
        token: 'testToken',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getTransactions } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getTransactions({
        token: 'key',
        type: 'TSLA',
        symbol: 'WMT',
        startDate: '123',
        endDate: '123',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getTransactions } = proxyquire('../../lib/transaction-history', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getTransactions({
        token: 'key',
        type: 'TSLA',
        symbol: 'WMT',
        startDate: '123',
        endDate: '123',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });
});
