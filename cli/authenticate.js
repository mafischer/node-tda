#!/usr/bin/env node
'use strict';
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { authenticate, generateTokens } = require('../lib/authenticate');

const argv = yargs(hideBin(process.argv)).argv

const consumerKey = argv['CONSUMER_KEY'];

if (consumerKey === undefined) {
  console.log('CONSUMER_KEY is required');
  process.exit(1);
}

authenticate({
  consumerKey
}).then(async (grant) => {
  console.log('authenticaton successful, retrieving tokens...');
  const tokens = await generateTokens({
    consumerKey,
    grant
  });
  console.log(tokens);
});
