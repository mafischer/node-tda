const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('Market Hours Test Suite', () => {

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

  describe('getHoursForMultipleMarkets Tests', () => {

    it('should return data upon success', async () => {
      const { getHoursForMultipleMarkets } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosSuccess
        }
      });
      const response = await getHoursForMultipleMarkets({
        consumerKey: 'key',
        markets: ['FOREX'],
        date: '2021-03-04'
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni'
      });
  
    });

    it('should return error upon 404', () => {
      const { getHoursForMultipleMarkets } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosNotFound
        }
      });

      const func = getHoursForMultipleMarkets.bind({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      })
      expect(func).to.throw;
  
    });

    it('should return error upon failure', (done) => {
      const { getHoursForMultipleMarkets } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosFailure
        }
      });
      getHoursForMultipleMarkets({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      }).then(data => {
        expect(data).to.be.undefined;
        done();
      }).catch(err => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
  
    });

    it('should callback upon success', (done) => {
      const { getHoursForMultipleMarkets } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosSuccess
        }
      });
      getHoursForMultipleMarkets({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      }, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.deep.equal({
          pizza: 'pepperoni'
        });
        done();
      });
  
    });

    it('should callback upon 404', (done) => {
      const { getHoursForMultipleMarkets } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosNotFound
        }
      });
      getHoursForMultipleMarkets({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      }, (err, data) => {
        expect(data).to.be.undefined;
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
  
    });

    it('should callback upon failure', (done) => {
      const { getHoursForMultipleMarkets } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosFailure
        }
      });
      getHoursForMultipleMarkets({
        token: 'testToken',
        date: '2021-03-04'
      }, (err, data) => {
        expect(data).to.be.undefined;
        expect(err.message).to.equal('500: oops!');
        done();
      });
  
    });

  });

  describe('getHoursForASingleMarket Tests', () => {

    it('should return data upon success', async () => {
      const { getHoursForASingleMarket } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosSuccess
        }
      });
      const response = await getHoursForASingleMarket({
        consumerKey: 'key',
        markets: ['FOREX'],
        date: '2021-03-04'
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni'
      });
  
    });

    it('should return error upon 404', (done) => {
      const { getHoursForASingleMarket } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosNotFound
        }
      });
      getHoursForASingleMarket({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      }).then(data => {
        expect(data).to.be.undefined;
        done();
      }).catch(err => {
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
  
    });

    it('should return error upon failure', (done) => {
      const { getHoursForASingleMarket } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosFailure
        }
      });
      getHoursForASingleMarket({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      }).then(data => {
        expect(data).to.be.undefined;
        done();
      }).catch(err => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
  
    });

    it('should callback upon success', (done) => {
      const { getHoursForASingleMarket } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosSuccess
        }
      });
      getHoursForASingleMarket({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      }, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.deep.equal({
          pizza: 'pepperoni'
        });
        done();
      });
  
    });

    it('should callback upon 404', (done) => {
      const { getHoursForASingleMarket } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosNotFound
        }
      });
      getHoursForASingleMarket({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      }, (err, data) => {
        expect(data).to.be.undefined;
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
  
    });

    it('should callback upon failure', (done) => {
      const { getHoursForASingleMarket } = proxyquire('../../lib/market-hours', {
        '../helpers': {
          axios: axiosFailure
        }
      });
      getHoursForASingleMarket({
        token: 'testToken',
        markets: ['FOREX'],
        date: '2021-03-04'
      }, (err, data) => {
        expect(data).to.be.undefined;
        expect(err.message).to.equal('500: oops!');
        done();
      });
  
    });

  });
});
