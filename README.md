# tda-node
Convenient library for [TDA REST API](https://developer.tdameritrade.com/apis).

## Status
![GitHub package.json version](https://img.shields.io/github/package-json/v/mafischer/node-tda)
[![CI](https://github.com/mafischer/tda-node/actions/workflows/node.js.yml/badge.svg)](https://github.com/mafischer/node-tda/actions/workflows/node.js.yml)
[![nycrc config on GitHub](https://img.shields.io/nycrc/mafischer/tda-node?config=.nycrc&preferredThreshold=lines)](https://github.com/mafischer/node-tda/actions/workflows/node.js.yml)
[![issues](https://img.shields.io/github/issues/mafischer/node-tda)](https://github.com/mafischer/node-tda/issues)
[![issues](https://img.shields.io/github/stars/mafischer/node-tda?style=social)](https://github.com/mafischer/node-tda/stargazers)


## Usage

### Install
- `npm install node-tda`

### CLI
For convenience, you can run the certs script to generate self-signed certs. `npm run certs`

For oauth login, run: `tda_authenticate --CONSUMER_KEY="<CONSUMER_KEY>"`

### Lib

#### API Functions
All functions names echo their respective names found in the [TDA API](https://developer.tdameritrade.com/apis) documentation.

i.e.:
``` javascript
// Get Accounts
// https://developer.tdameritrade.com/account-access/apis/get/accounts-0
const { getAccounts } = require('node-tda');

// Place Order
// https://developer.tdameritrade.com/account-access/apis/post/accounts/%7BaccountId%7D/orders-0
const { placeOrder } = require('node-tda');
```

The function signatures `apiFunc(options, callback);` include an optional callback. When the callback is omitted, a promise is returned.

#### async/await style
``` javascript
const { authenticate, generateTokens, refreshToken, getAccounts } = require('node-tda');

async function auth(consumerKey) {
  const grant = await authenticate({
    consumerKey
  });
  const token = await generateTokens({
    consumerKey,
    grant
  });
  return token['access_token'];
}

const consumerKey = "someKey";
auth(consumerKey)
  .then(async (token) => {
    const accounts = await getAccounts({ token });
    console.log(JSON.stringify(accounts));
    setInterval(async () => {
      // refresh token
      const newToken = refreshToken({
        ...token,
        consumerKey
      });
      console.log(JSON.stringify(newToken));
    }, 1800000);
  })
  .catch((err) => {
    console.log(err);
  });
```

#### callback style
``` javascript
const { authenticate, generateTokens, refreshToken, getAccounts } = require('node-tda');

function auth(consumerKey, callback) {
  authenticate({
    consumerKey
  }, (grant) => {
    generateTokens({
      consumerKey,
      grant
    }, (token) => {
      callback(null, token['access_token']);
    });
  });
}

const consumerKey = "someKey";
auth(consumerKey, (err, token) => {
  getAccounts({ token }, (accounts) => {
    console.log(JSON.stringify(accounts));
    setInterval(async () => {
      // refresh token
      const newToken = refreshToken({
        ...token,
        consumerKey
      });
      console.log(JSON.stringify(newToken));
    }, 1800000);
  });
});
```
