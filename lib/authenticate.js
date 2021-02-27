'use strict';
const axios = require('axios');
const endpoints = require('./endpoints.json');
const Hapi = require('@hapi/hapi');
const open = require('open');
const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem'))
};

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

  server.route({
    method: 'GET',
    path: '/',
    handler: async(req, h) => {
      setTimeout(() => {
        server.stop();
      }, 100);
      const code = decodeURI(req.query.code);
      authCb(code);
      return code;
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
        authCb(code) {
          resolve(code);
        }
      });
    });
  } else {
    init({
      key,
      cert,
      authCb(code) {
        callback(null, code);
      }
    });
  }
  
}

module.exports = {
  authenticate
};
