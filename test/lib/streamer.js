/* eslint-disable require-jsdoc */
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Streamer Test Suite', () => {
  let sandbox;

  class ws {
    constructor() {
      this.send = sinon.stub();
      setTimeout(() => {
        this.emit('close');
        this.emit('message', '{}');
        this.emit('open');
        try {
          this.emit('error', { message: 'oops' });
        } catch (err) {
          // an error occured, do nothing
        }
      }, 50);
    }

    on(name, callback) {
      this[name] = callback;
    }

    emit(name, arg) {
      this[name](arg);
    }
  }

  before(() => {
    sandbox = sinon.createSandbox();
  });

  after(() => {
    sandbox.restore();
  });

  it('should call constructor and emit disconnected', (done) => {
    const { Streamer } = proxyquire('../../lib/streamer', {
      ws,
    });

    const streamer = new Streamer({
      userPrincipalsResponse: {
        streamerInfo: {
          tokenTimestamp: '01-01-2021',
          userGroup: '',
          accessLevel: '',
          appId: '',
          acl: '',
        },
        accounts: [
          {
            accountId: '',
            company: '',
            segment: '',
            accountCdDomainId: '',
          },
        ],
      },
      verbosity: 'debug',
    });

    streamer.on('disconnected', (nothing) => {
      expect(nothing).to.be.undefined();
      done();
    });
  });

  it('should call constructor and emit connected', (done) => {
    const { Streamer } = proxyquire('../../lib/streamer', {
      ws,
    });

    const streamer = new Streamer({
      userPrincipalsResponse: {
        streamerInfo: {
          tokenTimestamp: '01-01-2021',
          userGroup: '',
          accessLevel: '',
          appId: '',
          acl: '',
        },
        accounts: [
          {
            accountId: '',
            company: '',
            segment: '',
            accountCdDomainId: '',
          },
        ],
      },
    });

    streamer.on('connected', (nothing) => {
      expect(nothing).to.be.undefined();
      done();
    });
  });

  it('should call constructor and emit message', (done) => {
    const { Streamer } = proxyquire('../../lib/streamer', {
      ws,
    });

    const streamer = new Streamer({
      userPrincipalsResponse: {
        streamerInfo: {
          tokenTimestamp: '01-01-2021',
          userGroup: '',
          accessLevel: '',
          appId: '',
          acl: '',
        },
        accounts: [
          {
            accountId: '',
            company: '',
            segment: '',
            accountCdDomainId: '',
          },
        ],
      },
    });

    streamer.on('message', (something) => {
      expect(something).to.deep.equal({});
      done();
    });
  });

  it('should call constructor and emit error', (done) => {
    const { Streamer } = proxyquire('../../lib/streamer', {
      ws,
    });

    const streamer = new Streamer({
      userPrincipalsResponse: {
        streamerInfo: {
          tokenTimestamp: '01-01-2021',
          userGroup: '',
          accessLevel: '',
          appId: '',
          acl: '',
        },
        accounts: [
          {
            accountId: '',
            company: '',
            segment: '',
            accountCdDomainId: '',
          },
        ],
      },
    });

    streamer.on('error', (something) => {
      expect(something).to.deep.equal({ message: 'oops' });
      done();
    });
  });

  it('should call constructor and emit error', (done) => {
    const { Streamer } = proxyquire('../../lib/streamer', {
      ws,
    });

    const streamer = new Streamer({
      userPrincipalsResponse: {
        streamerInfo: {
          tokenTimestamp: '01-01-2021',
          userGroup: '',
          accessLevel: '',
          appId: '',
          acl: '',
        },
        accounts: [
          {
            accountId: '',
            company: '',
            segment: '',
            accountCdDomainId: '',
          },
        ],
      },
    });

    streamer.on('error', (something) => {
      expect(something).to.deep.equal({ message: 'oops' });
      done();
    });
  });

  it('should call request function', async () => {
    const { Streamer } = proxyquire('../../lib/streamer', {
      ws,
    });

    const streamer = new Streamer({
      userPrincipalsResponse: {
        streamerInfo: {
          tokenTimestamp: '01-01-2021',
          userGroup: '',
          accessLevel: '',
          appId: '',
          acl: '',
        },
        accounts: [
          {
            accountId: '',
            company: '',
            segment: '',
            accountCdDomainId: '',
          },
        ],
      },
    });

    streamer.request({});
    expect(streamer.socket.send.calledOnce).to.be.true();
  });
});
