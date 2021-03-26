const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Watchlist Test Suite', () => {
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

  describe('createWatchlist Tests', () => {
    it('should return data upon success', async () => {
      const { createWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await createWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { createWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(createWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { createWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      createWatchlist({
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
      const { createWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      createWatchlist({
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
      const { createWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      createWatchlist({
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
      const { createWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      createWatchlist({
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

  describe('deleteWatchlist Tests', () => {
    it('should return data upon success', async () => {
      const { deleteWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await deleteWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { deleteWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(deleteWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { deleteWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      deleteWatchlist({
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
      const { deleteWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      deleteWatchlist({
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
      const { deleteWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      deleteWatchlist({
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
      const { deleteWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      deleteWatchlist({
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

  describe('getWatchlist Tests', () => {
    it('should return data upon success', async () => {
      const { getWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getWatchlist({
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
      const { getWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getWatchlist({
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
      const { getWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getWatchlist({
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
      const { getWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getWatchlist({
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

  describe('getWatchlistsForMultipleAccounts Tests', () => {
    it('should return data upon success', async () => {
      const { getWatchlistsForMultipleAccounts } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getWatchlistsForMultipleAccounts({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getWatchlistsForMultipleAccounts } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getWatchlistsForMultipleAccounts({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getWatchlistsForMultipleAccounts } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getWatchlistsForMultipleAccounts({
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
      const { getWatchlistsForMultipleAccounts } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getWatchlistsForMultipleAccounts({
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
      const { getWatchlistsForMultipleAccounts } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getWatchlistsForMultipleAccounts({
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
      const { getWatchlistsForMultipleAccounts } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getWatchlistsForMultipleAccounts({
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

  describe('getWatchlistForSingleAccount Tests', () => {
    it('should return data upon success', async () => {
      const { getWatchlistForSingleAccount } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getWatchlistForSingleAccount({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getWatchlistForSingleAccount } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getWatchlistForSingleAccount({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getWatchlistForSingleAccount } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getWatchlistForSingleAccount({
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
      const { getWatchlistForSingleAccount } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getWatchlistForSingleAccount({
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
      const { getWatchlistForSingleAccount } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getWatchlistForSingleAccount({
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
      const { getWatchlistForSingleAccount } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getWatchlistForSingleAccount({
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

  describe('replaceWatchlist Tests', () => {
    it('should return data upon success', async () => {
      const { replaceWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await replaceWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { replaceWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(replaceWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { replaceWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      replaceWatchlist({
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
      const { replaceWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      replaceWatchlist({
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
      const { replaceWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      replaceWatchlist({
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
      const { replaceWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      replaceWatchlist({
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

  describe('updateWatchlist Tests', () => {
    it('should return data upon success', async () => {
      const { updateWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await updateWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { updateWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(updateWatchlist({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { updateWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      updateWatchlist({
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
      const { updateWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      updateWatchlist({
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
      const { updateWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      updateWatchlist({
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
      const { updateWatchlist } = proxyquire('../../lib/watchlist', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      updateWatchlist({
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
});
