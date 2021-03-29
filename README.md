# node-tda
Convenient library for [TDA REST API](https://developer.tdameritrade.com/apis).

## Status
![GitHub package.json version](https://img.shields.io/github/package-json/v/mafischer/node-tda)
[![Build](https://github.com/mafischer/tda-node/actions/workflows/node.js.yml/badge.svg)](https://github.com/mafischer/node-tda/actions/workflows/node.js.yml)
[![nycrc config on GitHub](https://img.shields.io/nycrc/mafischer/tda-node?config=.nycrc&preferredThreshold=lines)](https://github.com/mafischer/node-tda/actions/workflows/node.js.yml)
[![issues](https://img.shields.io/github/issues/mafischer/node-tda)](https://github.com/mafischer/node-tda/issues)
[![issues](https://img.shields.io/github/stars/mafischer/node-tda?style=social)](https://github.com/mafischer/node-tda/stargazers)


## Usage

### Prerequisites
1. Follow these [instructions](https://developer.tdameritrade.com/content/getting-started) to create a tda developer account and app. Set your app redirect uri to `https://localhost:8443/`.
2. Take note of the consumer key generated for your app.
3. Install openssl on your system if you want to use the CLI to aid in retrieving your tokens.

### Install
- `npm install node-tda`

### CLI
For CLI usage, also install node-tda as a global package `npm install -g node-tda`

The cli uses an https server to retrieve access tokens from the tda oauth login. For convenience, self-signed certs are generated automatically upon install. If your system is missing `openssl` from its path, the certs will not be generated and the cli won't work.

For oauth login, run: `tda_authenticate --CONSUMER_KEY="<CONSUMER_KEY>"`

### Lib

#### API Functions
All functions names are a camelCase reflection their respective names found in the [TDA API](https://developer.tdameritrade.com/apis) documentation. As of the writing of this document, all of the functions published in TDA's web api have been implemented.

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

#### **Using Promises:**
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

#### **Using Callbacks:**
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
