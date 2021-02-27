#!/usr/bin/env node
'use strict';
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { authenticate } = require('../lib/authenticate');

const argv = yargs(hideBin(process.argv)).argv

if (argv['CONSUMER_KEY'] === undefined) {
  console.log('CONSUMER_KEY is required');
  process.exit(1);
}

console.log(argv['CONSUMER_KEY']);

authenticate({
  consumerKey: argv['CONSUMER_KEY']
}).then((code) => {
  console.log('authenticaton successful:')
  console.log(code);
});
