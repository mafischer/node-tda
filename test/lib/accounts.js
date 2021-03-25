const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Accounts Test Suite', () => {
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

  describe('getAccount Tests', () => {
    beforeEach(() => {
      axios404.resetHistory();
      axios200.resetHistory();
    });

    it('should return data upon success', async () => {
      const accounts = proxyquire('../../lib/accounts', {
        // 'axios': axios200
        axios: axiosSuccess,
      });
      const response = await accounts.getAccount({
        token: 'testToken',
        fields: ['positions', 'orders'],
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', (done) => {
      const accounts = proxyquire('../../lib/accounts', {
        // 'axios': axios200
        axios: axiosNotFound,
      });
      accounts.getAccount({
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
      const accounts = proxyquire('../../lib/accounts', {
        // 'axios': axios200
        axios: axiosFailure,
      });
      accounts.getAccount({
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
      const accounts = proxyquire('../../lib/accounts', {
        axios: axiosSuccess,
      });
      accounts.getAccount({
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
      const accounts = proxyquire('../../lib/accounts', {
        axios: axiosNotFound,
      });
      accounts.getAccount({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const accounts = proxyquire('../../lib/accounts', {
        // 'axios': axios200
        axios: axiosFailure,
      });
      accounts.getAccount({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('oops!');
        done();
      });
    });
  });

  describe('getAccounts Tests', () => {
    beforeEach(() => {
      axios404.resetHistory();
      axios200.resetHistory();
    });

    it('should return data upon success', async () => {
      const accounts = proxyquire('../../lib/accounts', {
        // 'axios': axios200
        axios: axiosSuccess,
      });
      const response = await accounts.getAccounts({
        token: 'testToken',
        fields: ['positions', 'orders'],
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', (done) => {
      const accounts = proxyquire('../../lib/accounts', {
        // 'axios': axios200
        axios: axiosNotFound,
      });
      accounts.getAccounts({
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
      const accounts = proxyquire('../../lib/accounts', {
        // 'axios': axios200
        axios: axiosFailure,
      });
      accounts.getAccounts({
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
      const accounts = proxyquire('../../lib/accounts', {
        axios: axiosSuccess,
      });
      accounts.getAccounts({
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
      const accounts = proxyquire('../../lib/accounts', {
        axios: axiosNotFound,
      });
      accounts.getAccounts({
        token: 'testToken',
        fields: ['positions', 'orders'],
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const accounts = proxyquire('../../lib/accounts', {
        // 'axios': axios200
        axios: axiosFailure,
      });
      accounts.getAccounts({
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
