const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const movers = require('../../lib/option-chains');

describe('Option Chains Test Suite', () => {
  
  let sandbox, axiosSuccess, axiosNotFound, axiosFailure;

  before(() => {
    sandbox = sinon.createSandbox();
    axiosSuccess = sandbox.stub().resolves({
      pizza: 'pepperoni'
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

  describe('getOptionChain Tests', () => {

    it('should return data upon success', async () => {
      const { getOptionChain } = proxyquire('../../lib/option-chains', {
        '../helpers': {
          axios: axiosSuccess
        }
      });
      const response = await getOptionChain({
        consumerKey: 'key',
        contractType: '$DJI',
        includeQuotes: '$DJI',
        strategy: '$DJI',
        range: '$DJI'
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni'
      });
  
    });

    it('should return error upon 404', () => {
      const { getOptionChain } = proxyquire('../../lib/option-chains', {
        '../helpers': {
          axios: axiosNotFound
        }
      });

      const func = getOptionChain.bind({
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
        optionType: '$DJI'
      });
      expect(func).to.throw;
  
    });

    it('should return error upon failure', (done) => {
      const { getOptionChain } = proxyquire('../../lib/option-chains', {
        '../helpers': {
          axios: axiosFailure
        }
      });
      getOptionChain({
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
        optionType: '$DJI'
      }).then(data => {
        expect(data).to.be.undefined;
        done();
      }).catch(err => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
  
    });

    it('should callback upon success', (done) => {
      const { getOptionChain } = proxyquire('../../lib/option-chains', {
        '../helpers': {
          axios: axiosSuccess
        }
      });
      getOptionChain({
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
        optionType: '$DJI'
      }, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.deep.equal({
          pizza: 'pepperoni'
        });
        done();
      });
  
    });

    it('should callback upon 404', (done) => {
      const { getOptionChain } = proxyquire('../../lib/option-chains', {
        '../helpers': {
          axios: axiosNotFound
        }
      });
      getOptionChain({
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
        optionType: '$DJI'
      }, (err, data) => {
        expect(data).to.be.undefined;
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
  
    });

    it('should callback upon failure', (done) => {
      const { getOptionChain } = proxyquire('../../lib/option-chains', {
        '../helpers': {
          axios: axiosFailure
        }
      });
      getOptionChain({
        token: 'testToken',
        volatility: '$DJI',
        underlyingPrice: '$DJI',
        interestRate: '$DJI',
        daysToExpiration: '$DJI',
        expMonth: '$DJI',
        optionType: '$DJI'
      }, (err, data) => {
        expect(data).to.be.undefined;
        expect(err.message).to.equal('500: oops!');
        done();
      });
  
    });

  });
});