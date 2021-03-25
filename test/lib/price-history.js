const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Price History Test Suite', () => {
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

  describe('getPriceHistory Tests', () => {
    it('should return data upon success', async () => {
      const { getPriceHistory } = proxyquire('../../lib/price-history', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      const response = await getPriceHistory({
        consumerKey: 'key',
        periodType: '$DJI',
        period: '$DJI',
      });
      expect(response).to.deep.equal({
        pizza: 'pepperoni',
      });
    });

    it('should return error upon 404', () => {
      const { getPriceHistory } = proxyquire('../../lib/price-history', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });

      expect(getPriceHistory({
        token: 'testToken',
        needExtendedHoursData: true,
        frequencyType: '$DJI',
        frequency: '$DJI',
        startDate: '$DJI',
        endDate: '$DJI',
      })).to.be.rejected();
    });

    it('should return error upon failure', (done) => {
      const { getPriceHistory } = proxyquire('../../lib/price-history', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getPriceHistory({
        token: 'testToken',
        needExtendedHoursData: true,
        frequencyType: '$DJI',
        frequency: '$DJI',
        startDate: '$DJI',
        endDate: '$DJI',
      }).then((data) => {
        expect(data).to.be.undefined();
        done();
      }).catch((err) => {
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });

    it('should callback upon success', (done) => {
      const { getPriceHistory } = proxyquire('../../lib/price-history', {
        '../helpers': {
          axios: axiosSuccess,
        },
      });
      getPriceHistory({
        token: 'testToken',
        needExtendedHoursData: true,
        frequencyType: '$DJI',
        frequency: '$DJI',
        startDate: '$DJI',
        endDate: '$DJI',
      }, (err, data) => {
        expect(err).to.be.null();
        expect(data).to.deep.equal({
          pizza: 'pepperoni',
        });
        done();
      });
    });

    it('should callback upon 404', (done) => {
      const { getPriceHistory } = proxyquire('../../lib/price-history', {
        '../helpers': {
          axios: axiosNotFound,
        },
      });
      getPriceHistory({
        token: 'testToken',
        needExtendedHoursData: true,
        frequencyType: '$DJI',
        frequency: '$DJI',
        startDate: '$DJI',
        endDate: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('404: Account not found!');
        done();
      });
    });

    it('should callback upon failure', (done) => {
      const { getPriceHistory } = proxyquire('../../lib/price-history', {
        '../helpers': {
          axios: axiosFailure,
        },
      });
      getPriceHistory({
        token: 'testToken',
        needExtendedHoursData: true,
        frequencyType: '$DJI',
        frequency: '$DJI',
        startDate: '$DJI',
        endDate: '$DJI',
      }, (err, data) => {
        expect(data).to.be.undefined();
        expect(err.message).to.equal('500: oops!');
        done();
      });
    });
  });
});
