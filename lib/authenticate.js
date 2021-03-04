'use strict';
const https = require('https');
const fs = require('fs');
const path = require('path');
const qs = require('qs');
const axios = require('axios');
const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const open = require('open');

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem'))
};

// TODO: allow configurable redirectURI and port
exports.init = async function init({ key, cert }, authCb) {

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
      authCb(null, code);
      return 'you may close this window';
    },
    options: {
      validate: {
        query: Joi.object({
          code: Joi.string().required()
        }).options({ stripUnknown: true })
      }
    }
  })

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

exports.authenticate = function authenticate({ consumerKey, key, cert }, callback = undefined) {

  const redirectURI = 'https://localhost:8443';
  const clientId = `${consumerKey}@AMER.OAUTHAP`;

  // opens the url in the default browser 
  open(encodeURI(`https://auth.tdameritrade.com/auth?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}`));

  const promise = new Promise(async (resolve, reject) => {
    try {
      await exports.init({
        key,
        cert
      },
      (err, grant) => {
        if(err) {
          reject(err);
        } else {
          resolve(grant);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

  if (callback !== undefined && typeof callback === 'function') {
    promise
      .then((tokens) => {
        callback(null, tokens);
      })
      .catch((err) => {
        callback(err);
      });
  } else {
    return promise;
  }
  
};

exports.generateTokens = function generateTokens({ consumerKey, grant }, callback) {
  
  const query = qs.stringify({
    'grant_type': 'authorization_code',
    'access_type': 'offline',
    'client_id': `${consumerKey}@AMER.OAUTHAP`,
    'redirect_uri': 'https://localhost:8443',
    'code': grant
  });

  const promise = new Promise(async (resolve, reject) => {

    try {
      const { data } = await axios({
        method: 'post',
        url: 'https://api.tdameritrade.com/v1/oauth2/token',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: query
      });
  
      resolve(data);

    } catch (err) {
      reject(err);
    }
  });

  if(callback !== undefined && typeof callback === 'function') {
    promise
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });    
  } else {
    return promise;
  }
};

exports.refreshToken = async function refreshToken({ consumerKey, refreshToken }, callback) {
  const  data = qs.stringify({
  'grant_type': 'refresh_token',
  'client_id': `${consumerKey}@AMER.OAUTHAP`,
  'refresh_token': refreshToken
  });

  const promise = new Promise(async (resolve, reject) => {
    try {

      const response = await axios({
        method: 'post',
        url: 'https://api.tdameritrade.com/v1/oauth2/token',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      });
  
      resolve(response.data);

    } catch (err) {
      reject(err);    }
  });

  if(callback !== undefined && typeof callback === 'function') {
    promise
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });    
  } else {
    return promise;
  }
}
