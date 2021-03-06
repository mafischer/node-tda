const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const ah = require('../../helpers');

describe('Axios Helper Test Suite', () => {

  let sandbox, axios, axiosHelper;

  before(() => {
    sandbox = sinon.createSandbox();
    axios = sandbox.stub();
    helper = proxyquire('../../helpers/axios', {
      'axios': axios
    });
  });

  beforeEach(() => {
    axios.reset();
  });

  after(() => {
    sandbox.restore();
  });

  describe('axios Tests', () => {

    it('should return data upon success', async () => {
      axios.resolves({
        status: 200,
        data: {
          pizza: 'pepperoni'
        }
      });
      const response = await helper.axios();
      expect(response).to.deep.equal({
        pizza: 'pepperoni'
      });
  
    });

    it('should return 404', () => {
      axios.resolves({
        status: 404,
        data: {}
      });
      expect(helper.axios.bind({})).to.throw;
    });

    it('should return error upon failure', () => {
      axios.rejects(new Error('500'));
      expect(helper.axios.bind({})).to.throw;
    });

  });
});