const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { expect } = chai;
chai.use(dirtyChai);
chai.use(chaiAsPromised);

describe('Saved Orders Test Suite', () => {
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

  describe('createSavedOrder Tests', () => {
    it('should return data upon success', async () => {
      const { createSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await createSavedOrder({
        consumerKey: 'key',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { createSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(createSavedOrder({
        token: 'testToken',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { createSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      createSavedOrder({
        token: 'testToken',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { createSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      createSavedOrder({
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
      const { createSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      createSavedOrder({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { createSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      createSavedOrder({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('deleteSavedOrder Tests', () => {
    it('should return data upon success', async () => {
      const { deleteSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await deleteSavedOrder({
        consumerKey: 'key',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { deleteSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(deleteSavedOrder({
        token: 'testToken',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { deleteSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      deleteSavedOrder({
        token: 'testToken',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { deleteSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      deleteSavedOrder({
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
      const { deleteSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      deleteSavedOrder({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { deleteSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      deleteSavedOrder({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('getSavedOrder Tests', () => {
    it('should return data upon success', async () => {
      const { getSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getSavedOrder({
        consumerKey: 'key',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getSavedOrder({
        token: 'testToken',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getSavedOrder({
        token: 'testToken',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getSavedOrder({
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
      const { getSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getSavedOrder({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getSavedOrder({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('getSavedOrdersByPath Tests', () => {
    it('should return data upon success', async () => {
      const { getSavedOrdersByPath } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getSavedOrdersByPath({
        consumerKey: 'key',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getSavedOrdersByPath } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getSavedOrdersByPath({
        token: 'testToken',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getSavedOrdersByPath } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getSavedOrdersByPath({
        token: 'testToken',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getSavedOrdersByPath } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getSavedOrdersByPath({
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
      const { getSavedOrdersByPath } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getSavedOrdersByPath({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getSavedOrdersByPath } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getSavedOrdersByPath({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('replaceSavedOrder Tests', () => {
    it('should return data upon success', async () => {
      const { replaceSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await replaceSavedOrder({
        consumerKey: 'key',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { replaceSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(replaceSavedOrder({
        token: 'testToken',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { replaceSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      replaceSavedOrder({
        token: 'testToken',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { replaceSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      replaceSavedOrder({
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
      const { replaceSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      replaceSavedOrder({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { replaceSavedOrder } = proxyquire('../../lib/saved-orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      replaceSavedOrder({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });
});
