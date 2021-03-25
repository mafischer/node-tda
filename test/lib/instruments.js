const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('Instruments Test Suite', () => {
  async function axiosSuccess() {
    return {
      status: 200,
      statusText: '',
      data: {
        pizza: 'pepperoni',
      },
    };
  }
  async function axiosNotFound() {
    return {
      status: 404,
      statusText: 'Account not found!',
    };
  }
  async function axiosFailure() {
    throw new Error('oops!');
  }
  let sandbox; let axios200; let
    axios404;

  before(() => {
    sandbox = sinon.createSandbox();
    axios200 = sandbox.spy(axiosSuccess);
    axios404 = sandbox.spy(axiosFailure);
  });

  after(() => {
    sandbox.restore();
  });

  describe('searchInstruments Tests', () => {
    beforeEach(() => {
      axios404.resetHistory();
      axios200.resetHistory();
    });

    it('should return data upon success', async () => {
      const instruments = proxyquire('../../lib/instruments', {
        // 'axios': axios200
        axios: axiosSuccess,
      });
      const response = await instruments.searchInstruments({
        consumerKey: 'key',
        fields: ['positions', 'orders'],
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        // 'axios': axios200
        axios: axiosNotFound,
      });
      instruments.searchInstruments({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should return error upon failure', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        // 'axios': axios200
        axios: axiosFailure,
      });
      instruments.searchInstruments({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        axios: axiosSuccess,
      });
      instruments.searchInstruments({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        axios: axiosNotFound,
      });
      instruments.searchInstruments({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        // 'axios': axios200
        axios: axiosFailure,
      });
      instruments.searchInstruments({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('oops!');
        done();
      });
    });
  });

  describe('getInstrument Tests', () => {
    beforeEach(() => {
      axios404.resetHistory();
      axios200.resetHistory();
    });

    it('should return data upon success', async () => {
      const instruments = proxyquire('../../lib/instruments', {
        // 'axios': axios200
        axios: axiosSuccess,
      });
      const response = await instruments.getInstrument({
        consumerKey: 'key',
        fields: ['positions', 'orders'],
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        // 'axios': axios200
        axios: axiosNotFound,
      });
      instruments.getInstrument({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should return error upon failure', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        // 'axios': axios200
        axios: axiosFailure,
      });
      instruments.getInstrument({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        axios: axiosSuccess,
      });
      instruments.getInstrument({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        axios: axiosNotFound,
      });
      instruments.getInstrument({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const instruments = proxyquire('../../lib/instruments', {
        // 'axios': axios200
        axios: axiosFailure,
      });
      instruments.getInstrument({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('oops!');
        done();
      });
    });
  });
});
