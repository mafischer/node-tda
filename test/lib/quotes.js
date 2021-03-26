const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Quotes Test Suite', () => {
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

  describe('getQuote Tests', () => {
    it('should return data upon success', async () => {
      const { getQuote } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getQuote({
        consumerKey: 'key',
        symbol: 'TSLA',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getQuote } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getQuote({
        token: 'testToken',
        symbol: 'TSLA',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getQuote } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getQuote({
        token: 'testToken',
        symbol: 'TSLA',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getQuote } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getQuote({
        token: 'testToken',
        symbol: 'TSLA',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getQuote } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getQuote({
        token: 'testToken',
        symbol: 'TSLA',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getQuote } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getQuote({
        token: 'testToken',
        symbol: 'TSLA',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('getQuotes Tests', () => {
    it('should return data upon success', async () => {
      const { getQuotes } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getQuotes({
        consumerKey: 'key',
        symbol: 'TSLA,WMT',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getQuotes } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getQuotes({
        token: 'testToken',
        symbol: 'TSLA',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getQuotes } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getQuotes({
        token: 'testToken',
        symbol: 'TSLA',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getQuotes } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getQuotes({
        token: 'testToken',
        symbol: 'TSLA',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getQuotes } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getQuotes({
        token: 'testToken',
        symbol: 'TSLA,WMT',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getQuotes } = proxyquire('../../lib/quotes', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getQuotes({
        token: 'testToken',
        symbol: 'TSLA',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });
});
