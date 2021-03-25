const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('CLI Test Suite', () => {
  const init = async () => {};
  const generateTokens = async () => ({
    token: 'imma token',
  });
  const authenticate = async () => generateTokens();

  let sandbox; let authenticateSpy; let initSpy; let generateTokensSpy; let exitStub; let
    logStub;

  before(() => {
    sandbox = sinon.createSandbox();
    authenticateSpy = sandbox.spy(authenticate);
    initSpy = sandbox.spy(init);
    generateTokensSpy = sandbox.spy(generateTokens);
    exitStub = sandbox.stub(process, 'exit');
    logStub = sandbox.stub(console, 'log');
  });

  beforeEach(() => {
    authenticateSpy.resetHistory();
    initSpy.resetHistory();
    generateTokensSpy.resetHistory();
    exitStub.resetHistory();
    logStub.resetHistory();
  });

  after(() => {
    sandbox.restore();
  });

  it('should abort and exit', (done) => {
    proxyquire('../../cli/authenticate', {
      'yargs/yargs': () => ({
        argv: {
          CONSUMER_KEY: undefined,
        },
      }),
      'yargs/helpers': {
        hideBin() {},
      },
      '../lib/authenticate': {
        init: initSpy,
        generateTokens: generateTokensSpy,
        authenticate: authenticateSpy,
      },
    });

    expect(exitStub.calledOnce).to.equal(true);
    expect(logStub.calledOnce).to.equal(true);
    done();
  });

  it('should authenticate and return a token', (done) => {
    proxyquire('../../cli/authenticate', {
      'yargs/yargs': () => ({
        argv: {
          CONSUMER_KEY: 'test',
        },
      }),
      'yargs/helpers': {
        hideBin() {},
      },
      '../lib/authenticate': {
        init: initSpy,
        generateTokens: generateTokensSpy,
        authenticate: authenticateSpy,
      },
    });

    expect(authenticateSpy.called).to.equal(true);
    // wait until authenticate promise is resolved
    setTimeout(() => {
      expect(generateTokensSpy.called).to.equal(true);
      expect(logStub.calledTwice).to.equal(true);
      done();
    }, 20);
  });
});
