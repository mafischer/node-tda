const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('User Info And Preferences Test Suite', () => {
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

  describe('getPreferences Tests', () => {
    it('should return data upon success', async () => {
      const { getPreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getPreferences({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getPreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getPreferences({
        token: 'key',
        accountId: 'TSLA',
        transactionId: '123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getPreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getPreferences({
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
      const { getPreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getPreferences({
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
      const { getPreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getPreferences({
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
      const { getPreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getPreferences({
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

  describe('getStreamerSubscriptionKeys Tests', () => {
    it('should return data upon success', async () => {
      const { getStreamerSubscriptionKeys } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getStreamerSubscriptionKeys({
        token: 'key',
        accountIds: 'TSLA,123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getStreamerSubscriptionKeys } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getStreamerSubscriptionKeys({
        token: 'key',
        accountIds: 'TSLA,123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getStreamerSubscriptionKeys } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getStreamerSubscriptionKeys({
        token: 'key',
        accountIds: 'TSLA,123',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getStreamerSubscriptionKeys } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getStreamerSubscriptionKeys({
        token: 'key',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getStreamerSubscriptionKeys } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getStreamerSubscriptionKeys({
        token: 'key',
        accountIds: 'TSLA,123',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getStreamerSubscriptionKeys } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getStreamerSubscriptionKeys({
        token: 'key',
        accountIds: 'TSLA,123',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('getUserPrincipals Tests', () => {
    it('should return data upon success', async () => {
      const { getUserPrincipals } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getUserPrincipals({
        token: 'key',
        fields: 'TSLA,123',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getUserPrincipals } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getUserPrincipals({
        token: 'key',
        fields: 'TSLA,123',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getUserPrincipals } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getUserPrincipals({
        token: 'key',
        fields: 'TSLA,123',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getUserPrincipals } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getUserPrincipals({
        token: 'key',
        fields: 'TSLA,123',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getUserPrincipals } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getUserPrincipals({
        token: 'key',
        fields: 'TSLA,123',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getUserPrincipals } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getUserPrincipals({
        token: 'key',
        fields: 'TSLA,123',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });

  describe('updatePreferences Tests', () => {
    it('should return data upon success', async () => {
      const { updatePreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await updatePreferences({
        token: 'key',
        accountId: 'TSLA',
        body: {},
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { updatePreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(updatePreferences({
        token: 'key',
        accountId: 'TSLA',
        body: {},
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { updatePreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      updatePreferences({
        token: 'key',
        accountId: 'TSLA',
        body: {},
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { updatePreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      updatePreferences({
        token: 'key',
        accountId: 'TSLA',
        body: {},
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { updatePreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      updatePreferences({
        token: 'key',
        accountId: 'TSLA',
        body: {},
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { updatePreferences } = proxyquire('../../lib/user-info-and-preferences', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      updatePreferences({
        token: 'key',
        accountId: 'TSLA',
        body: {},
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });
});
