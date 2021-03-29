#! /usr/bin/env node
/* eslint-disable no-console */
const { which, exec } = require('shelljs');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.resolve(__dirname, '../key.pem')) || !fs.existsSync(__dirname, '../cert.pem')) {
  const openssl = which('openssl');
  if (openssl) {
    exec('npm run certs');
  } else {
    console.warn('openssl is not installed');
  }
}
