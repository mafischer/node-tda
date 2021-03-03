# tda-node
Convenient library for [TDA REST API](https://developer.tdameritrade.com/apis).

## Status
![nycrc config on GitHub](https://img.shields.io/nycrc/mafischer/tda-node?config=.nycrc&preferredThreshold=lines)

## Usage

### Install
- `npm install node-tda`

### CLI
For convenience, you can run the certs script to generate self-signed certs. `npm run certs`

For oauth login, run: `tda_authenticate --CONSUMER_KEY="<CONSUMER_KEY>"`

### Lib

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
auth(consumerKey, (err, token) +> {
  getAccounts({ token }, (accounts) => {
    console.log(JSON.stringify(accounts));
  });
});
```
