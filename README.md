# tda-node
Convenient library for [TDA REST API](https://developer.tdameritrade.com/apis).

## Usage

### Install
- `npm install node-tda`

### CLI
For convenience, you can run the certs script to generate self-signed certs. `npm run certs`

For oauth login, run: `tda_authenticate --CONSUMER_KEY="<CONSUMER_KEY>"`

### Lib

#### async/await style
``` javascript
const { authenticate, generateTokens, refreshToken, accounts } = require('node-tda');

async function auth(consumerKey) {
  const grant = await authenticate();
  const token = await generateTokens({
    consumerKey,
    grant
  });
  return token
}

const consumerKey = "someKey";
auth(consumerKey)
  .then(async (token) => {
    const data = await accounts({ token });
  })
  .catch((err) => {
    console.log(err);
  });
```

#### callback style
``` javascript
const { authenticate, generateTokens, refreshToken, accounts } = require('node-tda');

function auth(consumerKey, callback) {
  authenticate({
    consumerKey
  }, (grant) => {
    generateTokens({
      consumerKey,
      grant
    }, (token) => {
      callback(null, token);
    });
  });
}

const consumerKey = "someKey";
auth(consumerKey, (token) +> {
  accounts({ token }, (data) => {
    console.log(data);
  });
});
```
