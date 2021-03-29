const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Certs Helper Test Suite', () => {
  let sandbox; let which; let exec; let existsSync;

  before(() => {
    sandbox = sinon.createSandbox();
    which = sandbox.stub();
    exec = sandbox.stub();
    existsSync = sandbox.stub();
  });

  beforeEach(() => {
    which.reset();
    exec.reset();
    existsSync.reset();
  });

  after(() => {
    sandbox.restore();
  });

  describe('certs Tests', () => {
    it('should run without error', async () => {
      which.returns('/usr/bin/openssl');
      existsSync.returns(false);
      proxyquire('../../helpers/certs', {
        shelljs: {
          which,
          exec,
        },
        fs: {
          existsSync,
        },
      });
      expect(which.calledOnce).to.equal(true);
      expect(exec.calledOnce).to.equal(true);
    });

    it('should not run when certs already exist', async () => {
      which.returns('/usr/bin/openssl');
      existsSync.returns(true);
      proxyquire('../../helpers/certs', {
        shelljs: {
          which,
          exec,
        },
        fs: {
          existsSync,
        },
      });
      expect(which.callCount).to.equal(0);
      expect(exec.callCount).to.equal(0);
    });

    it('should not run when openssl is not installed', async () => {
      which.returns(null);
      existsSync.returns(false);
      proxyquire('../../helpers/certs', {
        shelljs: {
          which,
          exec,
        },
        fs: {
          existsSync,
        },
      });
      expect(which.calledOnce).to.equal(true);
      expect(exec.callCount).to.equal(0);
    });
  });
});
