/* eslint-disable no-console */
const EventEmitter = require('events');
const WebSocket = require('ws');
const qs = require('querystring');

/**
 * Stream Interface for interacting with TDA Stream API
 * @emits {Object} message The 'message' event is emitted when the WebSocket receives a response from TDA.
 * @emits {*} disconnected The 'disconnected' event is emitted when the WebSocket connection to TDA has closed.
 * @emits {Object} error The 'error' event is emitted when an error occurs.
 * @emits {Object} connected The 'connected' event is emitted when the WebSocket connection to TDA has connected.
 */
class Streamer extends EventEmitter {
  /**
   * @param {Object} options
   * @param {Object} options.userPrincipalsResponse Response object from getUserPrincipals endpoint
   * @param {string} [options.accountIndex] The index of the account to use for streaming; default is 0.
   * @param {string} [options.verbosity] Can be info, debug, error; default is none.
   */
  constructor({ userPrincipalsResponse, accountIndex = 0, verbosity = 'none' }) {
    super();
    this.accountIndex = accountIndex;
    this.userPrincipalsResponse = userPrincipalsResponse;
    const self = this;

    const tokenTimeStampAsDateObj = new Date(userPrincipalsResponse.streamerInfo.tokenTimestamp);
    const tokenTimeStampAsMs = tokenTimeStampAsDateObj.getTime();

    const credentials = {
      userid: userPrincipalsResponse.accounts[accountIndex].accountId,
      token: userPrincipalsResponse.streamerInfo.token,
      company: userPrincipalsResponse.accounts[accountIndex].company,
      segment: userPrincipalsResponse.accounts[accountIndex].segment,
      cddomain: userPrincipalsResponse.accounts[accountIndex].accountCdDomainId,
      usergroup: userPrincipalsResponse.streamerInfo.userGroup,
      accesslevel: userPrincipalsResponse.streamerInfo.accessLevel,
      authorized: 'Y',
      timestamp: tokenTimeStampAsMs,
      appid: userPrincipalsResponse.streamerInfo.appId,
      acl: userPrincipalsResponse.streamerInfo.acl,
    };

    const login = {
      requests: [
        {
          service: 'ADMIN',
          command: 'LOGIN',
          requestid: 0,
          account: userPrincipalsResponse.accounts[accountIndex].accountId,
          source: userPrincipalsResponse.streamerInfo.appId,
          parameters: {
            credential: qs.stringify(credentials),
            token: userPrincipalsResponse.streamerInfo.token,
            version: '1.0',
          },
        },
      ],
    };

    const socket = new WebSocket(`wss://${userPrincipalsResponse.streamerInfo.streamerSocketUrl}/ws`);
    this.socket = socket;

    socket.on('error', (err) => {
      if (verbosity !== 'none') {
        console.log(err);
      }
      self.emit('error', err);
    });

    socket.on('message', (evt) => {
      const event = JSON.parse(evt);
      if (verbosity === 'debug') {
        console.log(evt);
      }
      self.emit('message', event);
    });

    socket.on('close', () => {
      if (verbosity === 'debug') {
        console.log('disconnected');
      }
      self.emit('disconnected');
    });

    socket.on('open', () => {
      socket.send(JSON.stringify(login));
      if (verbosity === 'debug') {
        console.log('connected');
      }
      self.emit('connected');
    });
  }

  /**
   * Send a request to Stream endpoint; see API docs at https://developer.tdameritrade.com/content/streaming-data
   * @param {Object} body The request body to send to the sever
   */
  request(body) {
    this.socket.send(JSON.stringify(body));
  }
}

module.exports = {
  Streamer,
};
