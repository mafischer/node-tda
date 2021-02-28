'use strict';
const https = require('https');
const fs = require('fs');
const path = require('path');
const qs = require('qs');
const axios = require('axios');
const endpoints = require('./endpoints.json');
const Hapi = require('@hapi/hapi');
const open = require('open');

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem'))
};

// TODO: allow configurable redirectURI and port
const init = async ({ key = undefined, cert = undefined, authCb }) => {

  if (key && fs.existsSync(path.resolve(key)) && cert && fs.existsSync(path.resolve(cert))) {
    options.key = fs.readFileSync(path.resolve(key));
    options.cert = fs.readFileSync(path.resolve(cert));
  }

  const server = Hapi.server({
    port: 8443,
    host: 'localhost',
    listener: https.createServer(options),
    tls: true
  });

  // TODO: make code query param manditory
  server.route({
    method: 'GET',
    path: '/',
    handler: async(req, h) => {
      setTimeout(() => {
        server.stop();
      }, 100);
      const code = decodeURI(req.query.code);
      authCb(code);
      return 'you may close this window';
    }
  })

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

function authenticate({ consumerKey, key = undefined, cert = undefined }, callback = undefined) {

  const redirectURI = 'https://localhost:8443';
  const clientId = encodeURI(`${consumerKey}@AMER.OAUTHAP`);

  // opens the url in the default browser 
  open(`${endpoints.oauth}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURI(redirectURI)}`);

  if (callback === undefined || typeof callback !== 'function') {
    return new Promise((resolve) => {
      init({
        key,
        cert,
        authCb(grant) {
          resolve(grant);
        }
      });
    });
  } else {
    init({
      key,
      cert,
      authCb(grant) {
        callback(null, grant);
      }
    });
  }
  
}

async function generateTokens({ consumerKey, grant }, callback) {
  
  const query = qs.stringify({
    'grant_type': 'authorization_code',
    'access_type': 'offline',
    'client_id': `${consumerKey}@AMER.OAUTHAP`,
    'redirect_uri': 'https://localhost:8443',
    'code': grant
   });

  try {

    const { data } = await axios({
      method: 'post',
      url: 'https://api.tdameritrade.com/v1/oauth2/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: query
    });

    if(callback !== undefined && typeof callback === 'function') {
      callback(null, data);
    }

    return data;

  } catch (err) {
    console.log(err);
  }
}

async function refreshToken({ consumerKey, refreshToken }, callback) {
  const  data = qs.stringify({
  'grant_type': 'refresh_token',
  'client_id': `${consumerKey}@AMER.OAUTHAP`,
  'refresh_token': refreshToken
  });

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.tdameritrade.com/v1/oauth2/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    });

    // TODO: data parsing
    console.log(JSON.stringify(response.data));

    if(callback !== undefined && typeof callback === 'function') {
      callback(null, response.data);
    }

    return response.data;

  } catch (err) {
    console.log(err);
  }

}

module.exports = {
  authenticate,
  generateTokens,
  refreshToken
};
