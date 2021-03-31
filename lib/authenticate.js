/* eslint-disable no-shadow */
/* eslint-disable no-console */
const https = require('https');
const fs = require('fs');
const path = require('path');
const qs = require('qs');
const axios = require('axios');
const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const readline = require('readline-promise').default;
const puppeteer = require('puppeteer');
const open = require('open');

const oauth = async (url, uid, pw) => {
  if (uid && pw) {
    try {
      const browser = await puppeteer.launch({
        // headless: false,
        ignoreHTTPSErrors: true,
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.focus('#username0');
      await page.keyboard.type(uid);
      await page.focus('#password1');
      await page.keyboard.type(pw);
      await page.click('#accept');
      await page.waitForNavigation();
      await page.click('#accept');
      await page.waitForSelector('#smscode0', { visible: true });
      const rlp = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
      });
      const smscode = await rlp.questionAsync('Please Enter your SMS Code\n');
      await page.focus('#smscode0');
      await page.keyboard.type(smscode);
      await page.click('#accept');
      await page.waitForSelector('label[for="trustthisdevice0_1"]', { visible: true });
      await page.click('label[for="trustthisdevice0_1"]');
      await page.click('#accept');
      // try {
      //   // seems to be necessary when not running headless
      //   await page.waitForNavigation({ timeout: 1000 });
      // } catch (err) {
      //   console.log(err.message);
      // }
      await page.click('#accept');
      await page.waitForNavigation();
      await browser.close();
    } catch (err) {
      console.log(err);
    }
  } else {
    open(url);
  }
};

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem')),
};

// TODO: allow configurable redirectURI and port
/**
 * Initialize server for passing of oauth grant
 * @param {Object} options
 * @param {string} options.key https server key.
 * @param {string} options.cert https server cert.
 * @param {function} authCb callback function.
 */
async function init({ key, cert }, authCb) {
  if (key && fs.existsSync(path.resolve(key)) && cert && fs.existsSync(path.resolve(cert))) {
    options.key = fs.readFileSync(path.resolve(key));
    options.cert = fs.readFileSync(path.resolve(cert));
  }

  const server = Hapi.server({
    port: 8443,
    host: 'localhost',
    listener: https.createServer(options),
    tls: true,
  });

  // TODO: make code query param manditory
  server.route({
    method: 'GET',
    path: '/',
    handler: async (req) => {
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
          code: Joi.string().required(),
        }).options({ stripUnknown: true }),
      },
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
}
exports.init = init;

/**
 * Authenticate with TDA using oauth
 * @param {Object} options
 * @param {string} options.consumerKey Consumer Key for TDA App
 * @param {string} [options.uid] TDA Userid; oauth flow will open a browser if omitted.
 * @param {string} [options.pw] TDA Password; oauth flow will open a browser if omitted.
 * @param {function} [callback] optional callback function, returns promise when ommited.
 */
function authenticate({
  consumerKey,
  uid,
  pw,
  key,
  cert,
}, callback = undefined) {
  const redirectURI = 'https://localhost:8443';
  const clientId = `${consumerKey}@AMER.OAUTHAP`;

  // opens the url in the default browser
  oauth(encodeURI(`https://auth.tdameritrade.com/auth?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}`), uid, pw);

  const promise = new Promise(async (resolve, reject) => {
    try {
      await exports.init({
        key,
        cert,
      },
      (err, grant) => {
        if (err) {
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
}
exports.authenticate = authenticate;

/**
 * Generate TDA tokens
 * @param {Object} options
 * @param {string} options.consumerKey Consumer Key for TDA App
 * @param {string} options.grant code grant returned by TDA oauth server.
 * @param {function} [callback] optional callback function, returns promise when ommited.
 */
function generateTokens({ consumerKey, grant }, callback) {
  const query = qs.stringify({
    grant_type: 'authorization_code',
    access_type: 'offline',
    client_id: `${consumerKey}@AMER.OAUTHAP`,
    redirect_uri: 'https://localhost:8443',
    code: grant,
  });

  const promise = new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: 'https://api.tdameritrade.com/v1/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: query,
      });

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

  if (callback !== undefined && typeof callback === 'function') {
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
exports.generateTokens = generateTokens;

/**
 * Refresh TDA Access Token
 * @param {Object} options
 * @param {string} options.consumerKey Consumer Key for TDA App.
 * @param {string} options.refreshToken refresh token provied by previous oauth sign in.
 * @param {function} [callback] optional callback function, returns promise when ommited.
 */
async function refreshToken({ consumerKey, refreshToken }, callback) {
  const data = qs.stringify({
    grant_type: 'refresh_token',
    client_id: `${consumerKey}@AMER.OAUTHAP`,
    refresh_token: refreshToken,
  });

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.tdameritrade.com/v1/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data,
      });

      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });

  if (callback !== undefined && typeof callback === 'function') {
    promise
      .then((datum) => {
        callback(null, datum);
      })
      .catch((err) => {
        callback(err);
      });
  } else {
    return promise;
  }
}
exports.refreshToken = refreshToken;
