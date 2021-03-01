const proxyquire = require('proxyquire');
const { expect } = require('chai');
const sinon = require('sinon');

describe('CLI Test Suite', function () {

  const init = async () => {};
  const generateTokens = async () => ({
    token: 'imma token'
  });
  const authenticate = async () => {
    return await generateTokens();
  };

  let sandbox, authenticateSpy, initSpy, generateTokensSpy;

  before(() => {
    sandbox = sinon.createSandbox();
    authenticateSpy = sandbox.spy(authenticate);
    initSpy = sandbox.spy(init);
    generateTokensSpy = sandbox.spy(generateTokens);
  });

  beforeEach(() => {
    authenticateSpy.resetHistory();
    initSpy.resetHistory();
    generateTokensSpy.resetHistory();
  });

  after(() => {
    sandbox.restore();
  });

  it('should authenticate and return a token', (done) => {

    proxyquire('../../cli/authenticate', {
      'yargs/yargs': () => ({
        argv: {
          CONSUMER_KEY: 'test'
        }
      }),
      'yargs/helpers': {
        hideBin() {}
      },
      '../lib/authenticate': {
        init: initSpy,
        generateTokens: generateTokensSpy,
        authenticate: authenticateSpy
      }
    });

    expect(authenticateSpy.called).to.equal(true);
    // wait until authenticate promise is resolved
    setTimeout(() => {
      expect(generateTokensSpy.called).to.equal(true);
      done();
    }, 50);
    
  });
});
