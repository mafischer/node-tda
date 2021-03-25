const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Orders Test Suite', () => {
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

  describe('cancelOrder Tests', () => {
    it('should return data upon success', async () => {
      const { cancelOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await cancelOrder({
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
      const { cancelOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(cancelOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { cancelOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      cancelOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { cancelOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      cancelOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { cancelOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      cancelOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { cancelOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      cancelOrder({
        token: 'testToken',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('getOrder Tests', () => {
    it('should return data upon success', async () => {
      const { getOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getOrder({
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
      const { getOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      const func = getOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      });
      expect(func).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getOrder({
        token: 'testToken',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('getOrdersByPath Tests', () => {
    it('should return data upon success', async () => {
      const { getOrdersByPath } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getOrdersByPath({
        consumerKey: 'key',
        fromEnteredTime: '$DJI',
        toEnteredTime: '$DJI',
        status: '$DJI',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getOrdersByPath } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getOrdersByPath({
        token: 'testToken',
        fromEnteredTime: '$DJI',
        toEnteredTime: '$DJI',
        status: '$DJI',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getOrdersByPath } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getOrdersByPath({
        token: 'testToken',
        fromEnteredTime: '$DJI',
        toEnteredTime: '$DJI',
        status: '$DJI',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getOrdersByPath } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getOrdersByPath({
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
      const { getOrdersByPath } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getOrdersByPath({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getOrdersByPath } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getOrdersByPath({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('getOrdersByQuery Tests', () => {
    it('should return data upon success', async () => {
      const { getOrdersByQuery } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getOrdersByQuery({
        token: 'token',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getOrdersByQuery } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getOrdersByQuery({
        token: 'testToken',
        accountId: '$DJI',
        maxResults: '$DJI',
        fromEnteredTime: '$DJI',
        toEnteredTime: '$DJI',
        status: '$DJI',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getOrdersByQuery } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getOrdersByQuery({
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
      const { getOrdersByQuery } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getOrdersByQuery({
        token: 'testToken',
        accountId: '$DJI',
        maxResults: '$DJI',
        fromEnteredTime: '$DJI',
        toEnteredTime: '$DJI',
        status: '$DJI',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getOrdersByQuery } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getOrdersByQuery({
        token: 'testToken',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getOrdersByQuery } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getOrdersByQuery({
        token: 'testToken',
        accountId: '$DJI',
        maxResults: '$DJI',
        fromEnteredTime: '$DJI',
        toEnteredTime: '$DJI',
        status: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('placeOrder Tests', () => {
    it('should return data upon success', async () => {
      const { placeOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await placeOrder({
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
      const { placeOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(placeOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { placeOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      placeOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { placeOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      placeOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { placeOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      placeOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { placeOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      placeOrder({
        token: 'testToken',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('replaceOrder Tests', () => {
    it('should return data upon success', async () => {
      const { replaceOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await replaceOrder({
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
      const { replaceOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(replaceOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { replaceOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      replaceOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { replaceOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      replaceOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { replaceOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      replaceOrder({
        token: 'testToken',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { replaceOrder } = proxyquire('../../lib/orders', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      replaceOrder({
        token: 'testToken',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });
});
