# node-tda

Convenient library for [TDA REST API](https://developer.tdameritrade.com/apis).

## Status

[![GitHub package.json version](https://img.shields.io/github/package-json/v/mafischer/node-tda)](https://github.com/mafischer/node-tda/blob/master/package.json#L3)
[![Build](https://github.com/mafischer/tda-node/actions/workflows/node.js.yml/badge.svg)](https://github.com/mafischer/node-tda/actions/workflows/node.js.yml)
[![nycrc config on GitHub](https://img.shields.io/nycrc/mafischer/tda-node?config=.nycrc&preferredThreshold=lines)](https://github.com/mafischer/node-tda/actions/workflows/node.js.yml)
[![issues](https://img.shields.io/github/issues/mafischer/node-tda)](https://github.com/mafischer/node-tda/issues)
[![issues](https://img.shields.io/github/stars/mafischer/node-tda?style=social)](https://github.com/mafischer/node-tda/stargazers)

## Contributing

Please review the [contributing](CONTRIBUTING.md) documentation.

## Prerequisites

1. Follow these [instructions](https://developer.tdameritrade.com/content/getting-started) to create a tda developer account and app. Set your app redirect uri to `https://localhost:8443/`.
2. Take note of the consumer key generated for your app.
3. Install openssl on your system if you want to use the CLI to aid in retrieving your tokens.

## Install

- `npm install node-tda`
- `npm install node-tda --no-optional` if you don't need puppeteer for oauth authentication in a headless browser

## Usage

### CLI

For CLI usage, also install node-tda as a global package `npm install -g node-tda`

The cli uses an https server to retrieve access tokens from the tda oauth login. For convenience, self-signed certs are generated automatically upon install. If your system is missing `openssl` from its path, the certs will not be generated and the cli won't work.

For automated oauth login:
``` bash
tda_authenticate --CONSUMER_KEY='<CONSUMER_KEY>' --UID='<userid>' --PW='<password>'
```

For manual oauth login:
``` bash
tda_authenticate --CONSUMER_KEY='<CONSUMER_KEY>'
```

### Lib

#### REST API

All functions names are a camelCase reflection their respective names found in the [TDA API](https://developer.tdameritrade.com/apis) documentation. As of the writing of this document, all of the functions published in TDA's web api have been implemented.

*Examples:*

``` javascript
// Get Accounts
// https://developer.tdameritrade.com/account-access/apis/get/accounts-0
const { getAccounts } = require('node-tda');

// Place Order
// https://developer.tdameritrade.com/account-access/apis/post/accounts/%7BaccountId%7D/orders-0
const { placeOrder } = require('node-tda');
```

The REST API function signatures `apiFunc(options, [callback])` include an optional callback, which when omitted, returns a promise.

##### Using Promises:

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
      const newToken = refreshTokenToken({
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

##### Using Callbacks:

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
      const newToken = refreshTokenToken({
        ...token,
        consumerKey
      });
      console.log(JSON.stringify(newToken));
    }, 1800000);
  });
});
```

#### Streaming API

The Streamer Class extends EventEmitter and facilitates the use of the streaming API. See TDA's Streaming API documentation [here](https://developer.tdameritrade.com/content/streaming-data).

##### Initialize Streaming Session:

``` javascript
const consumerKey = 'YourAppKey';
const refreshToken = 'YourRefreshToken';
async function streamingFun() {
  // refresh token:
  const { access_token } = await tda.refreshToken({
    consumerKey,
    refreshToken,
  });

  const userPrincipalsResponse = await tda.getUserPrincipals({
    token: access_token,
    fields: 'streamerSubscriptionKeys,streamerConnectionInfo',
  });

  const tdaStreamer = new tda.Streamer({
    userPrincipalsResponse,
  });

  tdaStreamer.on('connected', () => {
    tdaStreamer.request({
      requests: [
        {
          service: 'CHART_EQUITY',
          requestid: '2',
          command: 'SUBS',
          account: 'your_account',
          source: 'your_source_id',
          parameters: {
            keys: 'AAPL',
            fields: '0,1,2,3,4,5,6,7,8',
          },
        },
      ],
    });
  });

  tdaStreamer.on('message', (message) => {
    console.log(JSON.stringify(message));
  });
}

streamingFun();
```

##### Events:

| event        | emits          |
| ------------ | -------------- |
| error        | Error          |
| message      | message object |
| connected    | n/a            |
| disconnected | n/a            |
