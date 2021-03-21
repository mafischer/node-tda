const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const movers = require('../../lib/movers');

describe('Movers Test Suite', () => {
  
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

  describe('getMovers Tests', () => {

    it('should return data upon success', async () => {
      const { getMovers } = proxyquire('../../lib/movers', {
        '../helpers': {
          axios: axiosSuccess
        }
      });
      const response = await getMovers({
        consumerKey: 'key',
        index: '$DJI'
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni'
      });
  
    });

    it('should return error upon 404', () => {
      const { getMovers } = proxyquire('../../lib/movers', {
        '../helpers': {
          axios: axiosNotFound
        }
      });

      const func = getMovers.bind({
        token: 'testToken',
        change: 'value'
      });
      expect(func).to.throw;
  
    });

    it('should return error upon failure', (done) => {
      const { getMovers } = proxyquire('../../lib/movers', {
        '../helpers': {
          axios: axiosFailure
        }
      });
      getMovers({
        token: 'testToken',
        direction: 'up'
      }).then(data => {
        expect(data).to.be.undefined;
        done();
      }).catch(err => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
  
    });

    it('should callback upon success', (done) => {
      const { getMovers } = proxyquire('../../lib/movers', {
        '../helpers': {
          axios: axiosSuccess
        }
      });
      getMovers({
        token: 'testToken',
        change: 'value'
      }, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.deep.equal({
          pizza: 'pepperoni'
        });
        done();
      });
  
    });

    it('should callback upon 404', (done) => {
      const { getMovers } = proxyquire('../../lib/movers', {
        '../helpers': {
          axios: axiosNotFound
        }
      });
      getMovers({
        token: 'testToken',
        change: 'value'
      }, (err, data) => {
        expect(data).to.be.undefined;
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
  
    });

    it('should callback upon failure', (done) => {
      const { getMovers } = proxyquire('../../lib/movers', {
        '../helpers': {
          axios: axiosFailure
        }
      });
      getMovers({
        token: 'testToken',
        change: 'value'
      }, (err, data) => {
        expect(data).to.be.undefined;
        expect(err.message).to.equal('500: oops!');
        done();
      });
  
    });

  });
});
