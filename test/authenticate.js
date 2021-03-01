const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const auth  = proxyquire('../lib/authenticate.js', {
  'open': () => {} 
});

describe('Authenticate Test Suite', function () {

  const sandbox = sinon.createSandbox();
  let initStub;

  before(() => {
    initStub = sandbox.stub(auth, 'init');
  });

  beforeEach(async function () {
    initStub.reset();
  });

  it('should return a promise when called without a callback', async () => {

    const token =  {
      expires_in: 1800,
      refresh_token: '',
      access_token: ''
    }

    initStub.yields(null, token);

    const promise = auth.authenticate({
      consumerKey: '1234567890'
    });

    expect(promise instanceof Promise).to.equal(true);

  });

  it('should resolve a token', async () => {

    const token =  {
      expires_in: 1800,
      refresh_token: '',
      access_token: ''
    }
  
    initStub.yields(null, token);
  
    const tkn = await auth.authenticate({
      consumerKey: '1234567890'
    });
  
    expect(tkn).to.deep.equal(token);
  
  });

  it('should callback with a token', (done) => {

    const token =  {
      expires_in: 1800,
      refresh_token: '',
      access_token: ''
    }
  
    initStub.yields(null, token);
  
    auth.authenticate({
      consumerKey: '1234567890'
    }, (err, tkn) => {
      expect(tkn).to.deep.equal(token);
      done();
    });
  
  });

});
      